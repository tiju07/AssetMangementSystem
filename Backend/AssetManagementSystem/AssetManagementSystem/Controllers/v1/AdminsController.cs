using Microsoft.AspNetCore.Mvc;
using AssetManagementSystem.Models;
using AutoMapper;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;
namespace AssetManagementSystem.Controllers.v1
{
    [ApiVersion("1.0")]
    [Authorize(Roles = "Admin")]
    [Route("api/v{version:apiversion}/Admins")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<AdminsController> _logger;
        public AdminsController(IAdminRepository adminRepository, IMapper mapper, ILogger<AdminsController> logger)
        {
            _adminRepository = adminRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [MapToApiVersion("1.0")]
        [HttpGet("{adminID}")]
        public IActionResult GetAdminByID(int adminID)
        {
            try
            {
                int currentAdminID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (currentAdminID != adminID) return Unauthorized();

                if (!_adminRepository.AdminExists(adminID))
                {
                    return NotFound();
                }

                var admin = _mapper.Map<AdminDto>(_adminRepository.GetAdminByID(adminID));

                _logger.LogInformation($"Getting admin with ID: {admin.ID}");

                return Ok(admin);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[HttpPut("{adminID}")]
        public IActionResult UpdateAdmin(int adminID, AdminDto admin)
        {
            try
            {
                int currentAdminID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (currentAdminID != adminID || currentAdminID != admin.ID) return Unauthorized();

                var adminToUpdate = _mapper.Map<Admin>(admin);

                var originalData = _adminRepository.GetAdminByID(adminID);

                adminToUpdate.PasswordHash = originalData.PasswordHash;
                adminToUpdate.PasswordSalt = originalData.PasswordSalt;


                if (_adminRepository.AdminExists(_mapper.Map<AdminDto>(adminToUpdate))) ModelState.AddModelError("Errors", "A user with the given details already exists!");

                if (!ModelState.IsValid) return BadRequest(ModelState);

                var result = _adminRepository.UpdateAdmin(adminToUpdate);

                if (result)
                {
                    _logger.LogInformation($"Updating admin with ID: {adminToUpdate.ID}");
                    return NoContent();
                }
				_logger.LogError($"Error updating admin with ID: {adminToUpdate.ID}");
				ModelState.AddModelError("Errors", "An error occuerd while updating admin!");
                return StatusCode(500, ModelState);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[HttpDelete("{adminID}")]
        public IActionResult DeleteAdmin(int adminID)
        {
            try
            {
                int currentAdminID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (currentAdminID != adminID) return Unauthorized();

                if (!_adminRepository.AdminExists(adminID)) return NotFound();

                var result = _adminRepository.DeleteAdmin(adminID);
                if (result)
                {
                    _logger.LogInformation($"Deleting admin with ID: {adminID}");
                    return NoContent();
                }

                _logger.LogError($"Error deleting admin with ID: {adminID}");
                ModelState.AddModelError("Error", "An error occuerd while deleting the admin!");
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
