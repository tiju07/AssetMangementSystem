using System;
using Microsoft.AspNetCore.Mvc;
using AssetManagementSystem.Models;
using AssetManagementSystem.Interfaces;
using AutoMapper;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Utils;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Asp.Versioning;
using Microsoft.AspNetCore.Cors;

namespace AssetManagementSystem.Controllers.v1
{
	[ApiVersion("1.0")]
	[Route("api/v{version:apiversion}/AuditReportRequests")]
    [ApiController]
	[EnableCors]
	public class AssetAuditReportRequestsController : ControllerBase
    {
        private readonly IAssetAuditReportRequestRepository _assetAuditReportRequestRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IAssetCatalogueRepository _assetCatalogueRepository;
        private readonly IAssetAllocationRepository _assetAllocationRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<AssetAuditReportRequestsController> _logger;

        public AssetAuditReportRequestsController(IAssetAuditReportRequestRepository assetAuditReportRequestRepository, IEmployeeRepository employeeRepository, IAssetCatalogueRepository assetCatalogueRepository, IAssetAllocationRepository assetAllocationRepository, IMapper mapper, ILogger<AssetAuditReportRequestsController> logger)
        {
            _assetAuditReportRequestRepository = assetAuditReportRequestRepository;
            _employeeRepository = employeeRepository;
            _assetCatalogueRepository = assetCatalogueRepository;
            _assetAllocationRepository = assetAllocationRepository;
            _mapper = mapper;
            _logger = logger;
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin")]
        [HttpGet]
        public IActionResult GetAssetAuditReportRequests()
        {
            try
            {
                var requests = _mapper.Map<ICollection<AssetAuditReportRequestDto>>(_assetAuditReportRequestRepository.GetAllAuditRequests());
                return Ok(requests);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin, Employee")]
        [HttpGet("{requestID}")]
        public IActionResult GetAssetAuditReportRequestByID(int requestID)
        {
            try
            {
                string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

                int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (!_assetAuditReportRequestRepository.AssetAuditReportRequestExists(requestID))
                {
                    if (currentUserRole == "Admin") return NotFound();
                    return Unauthorized();
                }

                var assetAuditReportRequest = _mapper.Map<AssetAuditReportRequestDto>(_assetAuditReportRequestRepository.GetAuditRequestByID(requestID));

                if (currentUserRole != "Admin" && currentUserID != assetAuditReportRequest.EmployeeID) return Unauthorized();

                return Ok(assetAuditReportRequest);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin, Employee")]
        [HttpGet("Employee/{employeeID}")]
        public IActionResult GetAssetAuditReportRequestByEmployee(int employeeID)
        {
            try
            {
                string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

                int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (!_employeeRepository.EmployeeExists(employeeID))
                {
                    if (currentUserRole == "Admin") return NotFound("Could not find employee!");
                    return Unauthorized();
                }

                if (currentUserRole != "Admin" && currentUserID != employeeID) return Unauthorized();

                var assetAuditReportRequests = _mapper.Map<ICollection<AssetAuditReportRequestDto>>(_assetAuditReportRequestRepository.GetAuditRequestByEmployee(employeeID));


                return Ok(assetAuditReportRequests);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin, Employee")]
        [HttpPut("{requestID}")]
        public IActionResult UpdateAssetAuditReportRequest(int requestID, AssetAuditReportRequestDto assetAuditReportRequest)
        {
            try
            {
                string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

                int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (requestID != assetAuditReportRequest.RequestID) return BadRequest();

                if (!_assetAuditReportRequestRepository.AssetAuditReportRequestExists(requestID))
                {
                    if (currentUserRole == "Admin") return NotFound("Could not find request!");
                    return Unauthorized();
                }

                var originalRequest = _assetAuditReportRequestRepository.GetAuditRequestByID(requestID);

                if (currentUserRole != "Admin" && assetAuditReportRequest.EmployeeID != originalRequest.EmployeeID) return BadRequest();

                if (currentUserRole != "Admin" && currentUserID != assetAuditReportRequest.EmployeeID) return Unauthorized();

                if (currentUserRole != "Admin" && assetAuditReportRequest.AssetID != originalRequest.AssetID) return BadRequest();

                if (!_employeeRepository.EmployeeExists(assetAuditReportRequest.EmployeeID)) return NotFound("Employee does not exist!");

                if (!_assetCatalogueRepository.AssetExists(assetAuditReportRequest.AssetID)) return NotFound("Asset does not exist!");

                if (!AssetAuditReportRequestUtils.RequestStatusIsValid(assetAuditReportRequest.RequestStatus))
                {
                    ModelState.AddModelError("Error", "Invalid request status!");
                    return BadRequest(ModelState);
                }

                var requestToUpdate = _mapper.Map<AssetAuditReportRequest>(assetAuditReportRequest);

                var result = _assetAuditReportRequestRepository.UpdateAuditRequest(requestToUpdate);
                if (result) return NoContent();

                ModelState.AddModelError("Error", "An error occured updating the request!");
                return StatusCode(500, ModelState);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult CreateAssetAuditReportRequest(AssetAuditReportRequestDto assetAuditReportRequest)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                if (!_employeeRepository.EmployeeExists(assetAuditReportRequest.EmployeeID)) return NotFound("Could not find employee!");

                if (!_assetCatalogueRepository.AssetExists(assetAuditReportRequest.AssetID)) return NotFound("Could not find asset");

                if (!AssetAuditReportRequestUtils.RequestStatusIsValid(assetAuditReportRequest.RequestStatus))
                {
                    ModelState.AddModelError("Error", "Invalid request status!");
                    return BadRequest(ModelState);
                }

                var requestToCreate = _mapper.Map<AssetAuditReportRequest>(assetAuditReportRequest);

                var result = _assetAuditReportRequestRepository.CreateAuditRequest(requestToCreate);

                if (result) return Ok(_mapper.Map<AssetAuditReportRequestDto>(requestToCreate));

                ModelState.AddModelError("Error", "An error occured creating the request!");
                return StatusCode(500, ModelState);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }
    }
}
