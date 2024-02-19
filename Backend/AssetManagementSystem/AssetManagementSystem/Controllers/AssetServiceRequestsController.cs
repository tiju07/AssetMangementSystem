using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AssetManagementSystem.Models;
using AssetManagementSystem.Interfaces;
using AutoMapper;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;

namespace AssetManagementSystem.Controllers
{
    [Route("api/AssetServiceRequests")]
    [ApiController]
    public class AssetServiceRequestsController : ControllerBase
    {
        private readonly IAssetServiceRequestRepository _assetServiceRequestRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IAssetCatalogueRepository _assetCatalogueRepository;
        private readonly IAssetAllocationRepository _assetAllocationRepository;
        private readonly IMapper _mapper;

        public AssetServiceRequestsController(IAssetServiceRequestRepository assetServiceRequestRepository, IEmployeeRepository employeeRepository, IAssetCatalogueRepository assetCatalogueRepository, IAssetAllocationRepository assetAllocationRepository, IMapper mapper)
        {
            _assetServiceRequestRepository = assetServiceRequestRepository;
            _employeeRepository = employeeRepository;
            _assetCatalogueRepository = assetCatalogueRepository;
            _assetAllocationRepository = assetAllocationRepository;
            _mapper = mapper;
        }

		[Authorize(Roles = "Admin")]
		[HttpGet]
        public IActionResult GetAllAssetServiceRequests()
        {
            var requests = _mapper.Map<ICollection<AssetServiceRequestDto>>(_assetServiceRequestRepository.GetAllServiceRequests());

            return Ok(requests);
        }

		[Authorize(Roles = "Admin, Employee")]
		[HttpGet("{requestID}")]
        public IActionResult GetAssetServiceRequestByID(int requestID)
        {
			string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

			int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

            if (!_assetServiceRequestRepository.ServiceRequestExists(requestID))
            {
				if (currentUserRole == "Admin") return NotFound();
				return Unauthorized();
            }

            var request = _mapper.Map<AssetServiceRequestDto>(_assetServiceRequestRepository.GetServiceRequestByID(requestID));

			if (currentUserRole != "Admin" && currentUserID != request.EmployeeID) return Unauthorized();

			return Ok(request);
        }

		[Authorize(Roles = "Admin, Employee")]
		[HttpGet("Employee/{employeeID}")]
        public IActionResult GetAssetServiceRequestByEmployee(int employeeID)
        {
			string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

			int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

            if (!_employeeRepository.EmployeeExists(employeeID))
            {
				if (currentUserRole == "Admin") return NotFound();
				return Unauthorized();
			}

			if (currentUserRole != "Admin" && currentUserID != employeeID) return Unauthorized();

			var requests = _mapper.Map<ICollection<AssetServiceRequestDto>>(_assetServiceRequestRepository.GetServiceRequestsByEmployee(employeeID));

            return Ok(requests);
        }

		[Authorize(Roles = "Admin")]
		[HttpPut("{requestID}")]
        public IActionResult UpdateAssetServiceRequest(int requestID, AssetServiceRequestDto assetServiceRequest)
        {
            if (assetServiceRequest == null) return BadRequest();

            if (requestID != assetServiceRequest.RequestID) return BadRequest();

            if (!_employeeRepository.EmployeeExists(assetServiceRequest.EmployeeID)) return NotFound("Employee does not exist!");
            
            if (!_assetCatalogueRepository.AssetExists(assetServiceRequest.AssetID)) return NotFound("Asset does not exist!");

            if (!_assetAllocationRepository.AllocationDetailExists(assetServiceRequest.AssetID, assetServiceRequest.EmployeeID)) return NotFound("No matching allocatios found for the given employee and asset!");

            if(!(AssetServiceRequestUtils.IssueTypeIsValid(assetServiceRequest.IssueType))) return BadRequest("Invalid issue type!");

            if(!(AssetServiceRequestUtils.RequestStatusIsValid(assetServiceRequest.RequestStatus))) return BadRequest("Invalid request status!");

            var request = _mapper.Map<AssetServiceRequest>(assetServiceRequest);

            var result = _assetServiceRequestRepository.UpdateServiceRequest(request);

            if (result) return NoContent();

            ModelState.AddModelError("Error", "Error updating the request details!");
            return StatusCode(500, ModelState);
        }

		[Authorize(Roles = "Employee")]
		[HttpPost]
        public IActionResult CreateAssetServiceRequest(AssetServiceRequestDto assetServiceRequest)
        {
			string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

			int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

			if (assetServiceRequest == null) return BadRequest();

            if (currentUserID != assetServiceRequest.EmployeeID) return Unauthorized(); 

            if (!_assetCatalogueRepository.AssetExists(assetServiceRequest.AssetID)) return NotFound("Asset does not exist!");

            if (!_assetAllocationRepository.AllocationDetailExists(assetServiceRequest.AssetID, assetServiceRequest.EmployeeID)) return NotFound("No matching allocatios found for the given employee and asset!");

			if (!(AssetServiceRequestUtils.IssueTypeIsValid(assetServiceRequest.IssueType))) return BadRequest("Invalid issue type!");

			if (!(AssetServiceRequestUtils.RequestStatusIsValid(assetServiceRequest.RequestStatus))) return BadRequest("Invalid request status!");

			var request = _mapper.Map<AssetServiceRequest>(assetServiceRequest);

            var result = _assetServiceRequestRepository.CreateServiceRequest(request);

            if (result) return Ok(_mapper.Map<AssetServiceRequestDto>(request));

            ModelState.AddModelError("Error", "Error updating the request details!");
            return StatusCode(500, ModelState);
        }
    }
}
