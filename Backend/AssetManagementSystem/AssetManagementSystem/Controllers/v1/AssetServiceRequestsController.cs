﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AssetManagementSystem.Models;
using AssetManagementSystem.Interfaces;
using AutoMapper;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using Asp.Versioning;
using Microsoft.AspNetCore.Cors;

namespace AssetManagementSystem.Controllers.v1
{
	[ApiVersion("1.0")]
	[Route("api/v{version:apiversion}/AssetServiceRequests")]
    [ApiController]
	[EnableCors]
	public class AssetServiceRequestsController : ControllerBase
    {
        private readonly IAssetServiceRequestRepository _assetServiceRequestRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IAssetCatalogueRepository _assetCatalogueRepository;
        private readonly IAssetAllocationRepository _assetAllocationRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<AssetServiceRequestsController> _logger;

        public AssetServiceRequestsController(IAssetServiceRequestRepository assetServiceRequestRepository, IEmployeeRepository employeeRepository, IAssetCatalogueRepository assetCatalogueRepository, IAssetAllocationRepository assetAllocationRepository, IMapper mapper, ILogger<AssetServiceRequestsController> logger)
        {
            _assetServiceRequestRepository = assetServiceRequestRepository;
            _employeeRepository = employeeRepository;
            _assetCatalogueRepository = assetCatalogueRepository;
            _assetAllocationRepository = assetAllocationRepository;
            _mapper = mapper;
            _logger = logger;
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllAssetServiceRequests()
        {
            try
            {
                var requests = _mapper.Map<ICollection<AssetServiceRequestDto>>(await _assetServiceRequestRepository.GetAllServiceRequests());
                foreach (var request in requests)
                {
                    request.Employee = await _employeeRepository.GetEmployeeByID(request.EmployeeID);
                    request.Asset = _mapper.Map<AssetDto>(await _assetCatalogueRepository.GetAssetById(request.AssetID));
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
        public async Task<IActionResult> GetAssetServiceRequestByID(int requestID)
        {
            try
            {
                string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

                int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (!await _assetServiceRequestRepository.ServiceRequestExists(requestID))
                {
                    if (currentUserRole == "Admin") return NotFound();
                    return Unauthorized();
                }

                var request = _mapper.Map<AssetServiceRequestDto>(await _assetServiceRequestRepository.GetServiceRequestByID(requestID));

                if (currentUserRole != "Admin" && currentUserID != request.EmployeeID) return Unauthorized();
                request.Employee = await _employeeRepository.GetEmployeeByID(request.EmployeeID);
                request.Asset = _mapper.Map<AssetDto>(await _assetCatalogueRepository.GetAssetById(request.AssetID));

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
        public async Task<IActionResult> GetAssetServiceRequestByEmployee(int employeeID)
        {
            try
            {
                string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

                int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (!await _employeeRepository.EmployeeExists(employeeID))
                {
                    if (currentUserRole == "Admin") return NotFound();
                    return Unauthorized();
                }

                if (currentUserRole != "Admin" && currentUserID != employeeID) return Unauthorized();

                var requests = _mapper.Map<ICollection<AssetServiceRequestDto>>(await _assetServiceRequestRepository.GetServiceRequestsByEmployee(employeeID));
                foreach (var request in requests)
                {
                    request.Employee = await _employeeRepository.GetEmployeeByID(request.EmployeeID);
                    request.Asset = _mapper.Map<AssetDto>(await _assetCatalogueRepository.GetAssetById(request.AssetID));
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
        public async Task<IActionResult> UpdateAssetServiceRequest(int requestID, AssetServiceRequestDto assetServiceRequest)
        {
            try
            {
                if (assetServiceRequest == null) return BadRequest();

                if (requestID != assetServiceRequest.RequestID) return BadRequest();

                if (!await _employeeRepository.EmployeeExists(assetServiceRequest.EmployeeID)) return NotFound("Employee does not exist!");

                if (!await _assetCatalogueRepository.AssetExists(assetServiceRequest.AssetID)) return NotFound("Asset does not exist!");

                if (!await _assetAllocationRepository.AllocationDetailExists(assetServiceRequest.AssetID, assetServiceRequest.EmployeeID)) return NotFound("No matching allocatios found for the given employee and asset!");

                if (!AssetServiceRequestUtils.IssueTypeIsValid(assetServiceRequest.IssueType)) return BadRequest("Invalid issue type!");

                if (!AssetServiceRequestUtils.RequestStatusIsValid(assetServiceRequest.RequestStatus)) return BadRequest("Invalid request status!");

                var request = _mapper.Map<AssetServiceRequest>(assetServiceRequest);

                var result = await _assetServiceRequestRepository.UpdateServiceRequest(request);

                if (result) return NoContent();

                ModelState.AddModelError("Error", "Error updating the request details!");
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
        public async Task<IActionResult> CreateAssetServiceRequest(AssetServiceRequestDto assetServiceRequest)
        {
            try
            {
                string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

                int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (assetServiceRequest == null) return BadRequest();

                if (currentUserID != assetServiceRequest.EmployeeID) return Unauthorized();

                if (!await _assetCatalogueRepository.AssetExists(assetServiceRequest.AssetID)) return NotFound("Asset does not exist!");

                if (!await _assetAllocationRepository.AllocationDetailExists(assetServiceRequest.AssetID, assetServiceRequest.EmployeeID)) return NotFound("No matching allocatios found for the given employee and asset!");

                if (!AssetServiceRequestUtils.IssueTypeIsValid(assetServiceRequest.IssueType)) return BadRequest("Invalid issue type!");

                if (!AssetServiceRequestUtils.RequestStatusIsValid(assetServiceRequest.RequestStatus)) return BadRequest("Invalid request status!");

                var request = _mapper.Map<AssetServiceRequest>(assetServiceRequest);

                var result = await _assetServiceRequestRepository.CreateServiceRequest(request);

                if (result) return Ok(_mapper.Map<AssetServiceRequestDto>(request));

                ModelState.AddModelError("Error", "Error updating the request details!");
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
