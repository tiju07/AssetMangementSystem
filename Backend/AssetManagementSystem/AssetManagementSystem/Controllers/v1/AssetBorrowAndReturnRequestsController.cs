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
	[Route("api/v{version:apiversion}/AssetBorrowReturnRequests")]
    [ApiController]
	[EnableCors]
	public class AssetBorrowAndReturnRequestsController : ControllerBase
    {
        private readonly IAssetBorrowAndReturnRequestRepository _assetBorrowAndReturnRequestRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IAssetCatalogueRepository _assetCatalogueRepository;
        private readonly IAdminRepository _adminRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<AssetBorrowAndReturnRequestsController> _logger;

        public AssetBorrowAndReturnRequestsController(IAssetBorrowAndReturnRequestRepository assetBorrowAndReturnRequestRepository, IEmployeeRepository employeeRepository, IAssetCatalogueRepository assetCatalogueRepository, IAdminRepository adminRepository, IMapper mapper, ILogger<AssetBorrowAndReturnRequestsController> logger)
        {
            _assetBorrowAndReturnRequestRepository = assetBorrowAndReturnRequestRepository;
            _employeeRepository = employeeRepository;
            _assetCatalogueRepository = assetCatalogueRepository;
            _adminRepository = adminRepository;
            _mapper = mapper;
            _logger = logger;
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin")]
        [HttpGet]
        public IActionResult GetAssetBorrowAndReturnRequests()
        {
            try
            {
                var requests = _mapper.Map<ICollection<AssetBorrowAndReturnRequestDto>>(_assetBorrowAndReturnRequestRepository.GetAllRequests());
                foreach(var request in requests)
                {
                    request.Employee = _employeeRepository.GetEmployeeByID(request.EmployeeID);
                    request.Asset = _mapper.Map<AssetDto>(_assetCatalogueRepository.GetAssetById(request.AssetID));
                }
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
        public IActionResult GetAssetBorrowAndReturnRequestByID(int requestID)
        {
            try
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
                request.Asset = _mapper.Map<AssetDto>(_assetCatalogueRepository.GetAssetById(request.AssetID));
                request.Employee = _employeeRepository.GetEmployeeByID(request.EmployeeID);
                return Ok(request);
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
        public IActionResult GetAssetBorrowAndReturnRequestByEmployee(int employeeID)
        {
            try
            {
                string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

                int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (currentUserRole != "Admin" && currentUserID != employeeID) return Unauthorized();

                if (currentUserRole == "Admin" && !_employeeRepository.EmployeeExists(employeeID)) return NotFound();

                var requests = _mapper.Map<ICollection<AssetBorrowAndReturnRequestDto>>(_assetBorrowAndReturnRequestRepository.GetRequestByEmployee(employeeID));
                foreach (var request in requests)
                {
                    request.Employee = _employeeRepository.GetEmployeeByID(request.EmployeeID);
                    request.Asset = _mapper.Map<AssetDto>(_assetCatalogueRepository.GetAssetById(request.AssetID));
                }
                return Ok(requests);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin")]
        [HttpPut("{requestID}")]
        public IActionResult UpdateAssetBorrowAndReturnRequest(int requestID, AssetBorrowAndReturnRequestDto assetBorrowAndReturnRequest)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                if (requestID != assetBorrowAndReturnRequest.RequestID) return BadRequest(ModelState);

                if (!_assetBorrowAndReturnRequestRepository.RequestExists(requestID)) return NotFound("Could not find request!");

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

                if(!AssetBorrowAndReturnRequestUtils.RequestStatusIsValid(assetBorrowAndReturnRequest.RequestStatus))
                {
                    ModelState.AddModelError("Error", "Invalid Request Status!");
                }

                if (!(assetBorrowAndReturnRequest.AssetCount > 0)) return BadRequest("Asset count should be atleast 1!");

                var request = _mapper.Map<AssetBorrowAndReturnRequest>(assetBorrowAndReturnRequest);

                var result = _assetBorrowAndReturnRequestRepository.UpdateRequest(request);

                if (result) return NoContent();

                ModelState.AddModelError("Error", "Error updating the request!");
                return StatusCode(500, ModelState);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Employee")]
        [HttpPost]
        public IActionResult CreateAssetBorrowAndReturnRequest(AssetBorrowAndReturnRequestDto assetBorrowAndReturnRequest)
        {
            try
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

                if (!AssetBorrowAndReturnRequestUtils.RequestStatusIsValid(assetBorrowAndReturnRequest.RequestStatus))
                {
                    ModelState.AddModelError("Error", "Invalid Request Status!");
                }

                if (!(assetBorrowAndReturnRequest.AssetCount > 0)) return BadRequest("Asset count should be atleast 1!");

                var request = _mapper.Map<AssetBorrowAndReturnRequest>(assetBorrowAndReturnRequest);

                var result = _assetBorrowAndReturnRequestRepository.CreateRequest(request);

                if (result) return Ok(_mapper.Map<AssetBorrowAndReturnRequestDto>(request));

                ModelState.AddModelError("Error", "Error creating the request!");
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
