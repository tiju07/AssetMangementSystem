using Microsoft.AspNetCore.Mvc;
using AssetManagementSystem.Models;
using AssetManagementSystem.Interfaces;
using AutoMapper;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Utils;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace AssetManagementSystem.Controllers
{
	[Route("api/AssetBorrowReturnRequests")]
	[ApiController]
	public class AssetBorrowAndReturnRequestsController : ControllerBase
	{
		private readonly IAssetBorrowAndReturnRequestRepository _assetBorrowAndReturnRequestRepository;
		private readonly IEmployeeRepository _employeeRepository;
		private readonly IAssetCatalogueRepository _assetCatalogueRepository;
		private readonly IAdminRepository _adminRepository;
		private readonly IMapper _mapper;

		public AssetBorrowAndReturnRequestsController(IAssetBorrowAndReturnRequestRepository assetBorrowAndReturnRequestRepository, IEmployeeRepository employeeRepository, IAssetCatalogueRepository assetCatalogueRepository, IAdminRepository adminRepository, IMapper mapper)
		{
			_assetBorrowAndReturnRequestRepository = assetBorrowAndReturnRequestRepository;
			_employeeRepository = employeeRepository;
			_assetCatalogueRepository = assetCatalogueRepository;
			_adminRepository = adminRepository;
			_mapper = mapper;
		}

		[Authorize(Roles = "Admin")]
		[HttpGet]
		public IActionResult GetAssetBorrowAndReturnRequests()
		{
			var requests = _mapper.Map<ICollection<AssetBorrowAndReturnRequestDto>>(_assetBorrowAndReturnRequestRepository.GetAllRequests());
			return Ok(requests);
		}

		[Authorize(Roles = "Admin, Employee")]
		[HttpGet("{requestID}")]
		public IActionResult GetAssetBorrowAndReturnRequestByID(int requestID)
		{
			string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

			int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

			if (!_assetBorrowAndReturnRequestRepository.RequestExists(requestID))
			{
				if (currentUserRole == "Admin") return NotFound();
				return Unauthorized();
			}
			var request = _mapper.Map<AssetBorrowAndReturnRequestDto>(_assetBorrowAndReturnRequestRepository.GetRequestById(requestID));

			if (currentUserRole != "Admin" && currentUserID != request.EmployeeID) return Unauthorized();

			return Ok(request);
		}

		[Authorize(Roles = "Admin, Employee")]
		[HttpGet("Employee/{employeeID}")]
		public IActionResult GetAssetBorrowAndReturnRequestByEmployee(int employeeID)
		{
			string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

			int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

			if (currentUserRole != "Admin" && currentUserID != employeeID) return Unauthorized();

			if (currentUserRole == "Admin" && !_employeeRepository.EmployeeExists(employeeID)) return NotFound();

			var request = _mapper.Map<ICollection<AssetBorrowAndReturnRequestDto>>(_assetBorrowAndReturnRequestRepository.GetRequestByEmployee(employeeID));

			return Ok(request);
		}

		[Authorize(Roles = "Admin")]
		[HttpPut("{requestID}")]
		public IActionResult UpdateAssetBorrowAndReturnRequest(int requestID, AssetBorrowAndReturnRequestDto assetBorrowAndReturnRequest)
		{
			if (!ModelState.IsValid) return BadRequest(ModelState);
			if (requestID != assetBorrowAndReturnRequest.RequestID) return BadRequest(ModelState);

			if(!_assetBorrowAndReturnRequestRepository.RequestExists(requestID)) return NotFound("Could not find request!");

			if (!_employeeRepository.EmployeeExists(assetBorrowAndReturnRequest.EmployeeID)) return NotFound("Could not find employee!");

			if (!_adminRepository.AdminExists(assetBorrowAndReturnRequest.AdminID)) return NotFound("Could not find admin!");

			if (!_assetCatalogueRepository.AssetExists(assetBorrowAndReturnRequest.AssetID)) return NotFound("Could not find asset!");

			if (assetBorrowAndReturnRequest.AssetCount < 1) return BadRequest("Invalid asset count!");

			if (assetBorrowAndReturnRequest.AssetAllocationTill <= assetBorrowAndReturnRequest.AssetAllocationFrom) return BadRequest("Invalid allocation period!");

			if (!AssetBorrowAndReturnRequestUtils.RequestTypeIsValid(assetBorrowAndReturnRequest.AssetRequestType))
			{
				ModelState.AddModelError("Error", "Invalid request type!");
				return BadRequest(ModelState);
			}

			if (!(assetBorrowAndReturnRequest.AssetCount > 0)) return BadRequest("Asset count should be atleast 1!");

			var request = _mapper.Map<AssetBorrowAndReturnRequest>(assetBorrowAndReturnRequest);

			var result = _assetBorrowAndReturnRequestRepository.UpdateRequest(request);

			if (result) return NoContent();

			ModelState.AddModelError("Error", "Error updating the request!");
			return StatusCode(500, ModelState);
		}

		[Authorize(Roles = "Employee")]
		[HttpPost]
		public IActionResult CreateAssetBorrowAndReturnRequest(AssetBorrowAndReturnRequestDto assetBorrowAndReturnRequest)
		{
			string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

			int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

			if (!ModelState.IsValid) return BadRequest(ModelState);

			if (currentUserID != assetBorrowAndReturnRequest.EmployeeID) return Unauthorized();

			if (!_adminRepository.AdminExists(assetBorrowAndReturnRequest.AdminID)) return NotFound("Could not find admin!");

			if (!_assetCatalogueRepository.AssetExists(assetBorrowAndReturnRequest.AssetID)) return NotFound("Could not find asset!");

			if (assetBorrowAndReturnRequest.AssetCount < 1) return BadRequest("Invalid asset count!");

			if (assetBorrowAndReturnRequest.AssetAllocationTill <= assetBorrowAndReturnRequest.AssetAllocationFrom) return BadRequest("Invalid allocation period!");

			if (!AssetBorrowAndReturnRequestUtils.RequestTypeIsValid(assetBorrowAndReturnRequest.AssetRequestType))
			{
				ModelState.AddModelError("Error", "Invalid request type!");
				return BadRequest(ModelState);
			}

			if (!(assetBorrowAndReturnRequest.AssetCount > 0)) return BadRequest("Asset count should be atleast 1!");

			var request = _mapper.Map<AssetBorrowAndReturnRequest>(assetBorrowAndReturnRequest);

			var result = _assetBorrowAndReturnRequestRepository.CreateRequest(request);

			if (result) return Ok(_mapper.Map<AssetBorrowAndReturnRequestDto>(request));

			ModelState.AddModelError("Error", "Error creating the request!");
			return StatusCode(500, ModelState);
		}
	}
}
