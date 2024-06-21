using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AssetManagementSystem.Models;
using AssetManagementSystem.Repository;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Dto;
using AutoMapper;
using AssetManagementSystem.Utils;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Asp.Versioning;
using Microsoft.AspNetCore.Cors;

namespace AssetManagementSystem.Controllers.v1
{
	[ApiVersion("1.0")]
	[Route("api/v{version:apiversion}/AllocationDetails")]
    [ApiController]
	[EnableCors]
	public class AssetAllocationDetailsController : ControllerBase
    {

        private readonly IAssetAllocationRepository _assetAllocationRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IAssetCatalogueRepository _assetCatalogueRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<AssetAllocationDetailsController> _logger;

        public AssetAllocationDetailsController(IAssetAllocationRepository assetAllocationRepository, IEmployeeRepository employeeRepository, IAssetCatalogueRepository assetCatalogueRepository, IMapper mapper, ILogger<AssetAllocationDetailsController> logger)
        {
            _assetAllocationRepository = assetAllocationRepository;
            _employeeRepository = employeeRepository;
            _assetCatalogueRepository = assetCatalogueRepository;
            _mapper = mapper;
            _logger = logger;
        }

		[MapToApiVersion("1.0")]
		//[Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllAssetAllocationDetails()
        {
            try
            {
                string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;
                _logger.LogCritical($"User Role {currentUserRole}");

                int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);
                _logger.LogCritical($"User ID {currentUserID}");
                var assetAllocationDetails = _mapper.Map<ICollection<AssetAllocationDetailDto>>(await _assetAllocationRepository.GetAllAssetAllocations());

                return Ok(assetAllocationDetails);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin, Employee")]
        [HttpGet("{assetAllocationID}")]
        public async Task<IActionResult> GetAssetAllocationDetailByID(int assetAllocationID)
        {
            try
            {
                string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;
                _logger.LogCritical($"User Role {currentUserRole}");

                int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);
                _logger.LogCritical($"User ID {currentUserID}");

                if (!await _assetAllocationRepository.AllocationDetailExists(assetAllocationID))
                {
                    if (currentUserRole == "Admin") return NotFound();
                    return Unauthorized();
                }

                var assetAllocationDetail = _mapper.Map<AssetAllocationDetailDto>(await _assetAllocationRepository.GetAssetAllocationByID(assetAllocationID));

                if (currentUserRole != "Admin" && currentUserID != assetAllocationDetail.EmployeeID) return Unauthorized();

                return Ok(assetAllocationDetail);
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
        public async Task<IActionResult> GetAssetAllocationDetailsByEmployee(int employeeID)
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

                var assetAllocationDetails = _mapper.Map<ICollection<AssetAllocationDetailDto>>(await _assetAllocationRepository.GetAssetAllocationsByEmployee(employeeID));
                return Ok(assetAllocationDetails);
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
        public async Task<IActionResult> CreateAssetAllocationDetail(AssetAllocationDetailDto assetAllocationDetail)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                if (!await _employeeRepository.EmployeeExists(assetAllocationDetail.EmployeeID)) return NotFound("Employee not found!");

                if (!await _assetCatalogueRepository.AssetExists(assetAllocationDetail.AssetID)) return NotFound("Asset not found!");

                if (assetAllocationDetail.AssetCount < 1) return BadRequest("Invalid asset count!");

                if (assetAllocationDetail.AssetAllocatedTill <= assetAllocationDetail.AssetAllocatedFrom) return BadRequest("Invalid allocation period!");

                if (!AssetAllocationUtils.AllocationStatusIsValid(assetAllocationDetail.AllocationStatus))
                {
                    ModelState.AddModelError("Error", "Invalid allocation status!");
                    return BadRequest(ModelState);
                }
                var assetAllocation = _mapper.Map<AssetAllocationDetail>(assetAllocationDetail);

                var result = await _assetAllocationRepository.AllocateAsset(assetAllocation);

                if (result) return Ok(assetAllocation);

                ModelState.AddModelError("Error", "An error occuerd while adding the allocation details!");
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
        [HttpPut("{assetAllocationID}")]
        public async Task<IActionResult> UpdateAssetAllocationDetail(int assetAllocationID, AssetAllocationDetailDto assetAllocationDetail)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                if (!await _assetAllocationRepository.AllocationDetailExists(assetAllocationDetail.AssetAllocationID)) return NotFound("Asset allocation details not found!");

                if (!await _employeeRepository.EmployeeExists(assetAllocationDetail.EmployeeID)) return NotFound("Employee not found!");

                if (!await _assetCatalogueRepository.AssetExists(assetAllocationDetail.AssetID)) return NotFound("Asset not found!");

                if (assetAllocationDetail.AssetCount < 1) return BadRequest("Invalid asset count!");

                if (assetAllocationDetail.AssetAllocatedTill <= assetAllocationDetail.AssetAllocatedFrom) return BadRequest("Invalid allocation period!");

                if (!AssetAllocationUtils.AllocationStatusIsValid(assetAllocationDetail.AllocationStatus))
                {
                    ModelState.AddModelError("Error", "Invalid allocation status!");
                    return BadRequest(ModelState);
                }

                var allocationDetail = _mapper.Map<AssetAllocationDetail>(assetAllocationDetail);

                var result = await _assetAllocationRepository.UpdateAllocationDetails(allocationDetail);
                if (result) return Ok(allocationDetail);

                ModelState.AddModelError("Error", "An error occuerd while updating asset allocation details!");
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
        [HttpDelete("{assetAllocationID}")]
        public async Task<IActionResult> DeleteAssetAllocationDetail(int assetAllocationID)
        {
            try
            {
                if (!await _assetAllocationRepository.AllocationDetailExists(assetAllocationID)) return NotFound("Asset allocation details not found!");

                var result = await _assetAllocationRepository.DeallocateAsset(assetAllocationID);

                if (result) return Ok();

                ModelState.AddModelError("Error", "An error occuerd while deleting allocation details!");
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
