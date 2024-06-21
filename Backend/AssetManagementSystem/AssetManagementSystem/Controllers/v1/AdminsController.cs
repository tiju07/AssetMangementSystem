using Microsoft.AspNetCore.Mvc;
using AssetManagementSystem.Models;
using AutoMapper;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;
using Microsoft.AspNetCore.Cors;
using System.Security.Cryptography;
using System.Text;
namespace AssetManagementSystem.Controllers.v1
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiversion}/Admins")]
    [ApiController]
    [EnableCors]
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
        [Authorize(Roles = "Admin")]
        [HttpGet("{adminID}")]
        public async Task<IActionResult> GetAdminByID(int adminID)
        {
            try
            {
                int currentAdminID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (currentAdminID != adminID) return Unauthorized();

                if (!await _adminRepository.AdminExists(adminID))
                {
                    return NotFound();
                }

                var admin = _mapper.Map<AdminDto>(await _adminRepository.GetAdminByID(adminID));

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
        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("GetAccountsWithPendingAccess")]
        public async Task<IActionResult> GetAccountsWithPendingAccess()
        {
            try
            {
                var admins = _mapper.Map<ICollection<AdminDto>>(await _adminRepository.GetAdminsWithPendingAccess());
                return Ok(admins);

            }catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }

        }

        [MapToApiVersion("1.0")]
        [Authorize(Roles = "Admin")]
        [HttpPut("{adminID}")]
        public async Task<IActionResult> UpdateAdmin(int adminID, AdminDto admin)
        {
            try
            {
                int currentAdminID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (currentAdminID != adminID || currentAdminID != admin.ID) return Unauthorized();

                var adminToUpdate = _mapper.Map<Admin>(admin);

                var originalData = await _adminRepository.GetAdminByID(adminID);

                adminToUpdate.PasswordHash = originalData.PasswordHash;
                adminToUpdate.PasswordSalt = originalData.PasswordSalt;


                if (originalData.Email != adminToUpdate.Email && await _adminRepository.AdminExists(_mapper.Map<AdminDto>(adminToUpdate))) ModelState.AddModelError("Errors", "A user with the given details already exists!");

                if (!ModelState.IsValid) return BadRequest(ModelState);

                var result = await _adminRepository.UpdateAdmin(adminToUpdate);

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
        [Authorize(Roles = "Admin")]
        [HttpDelete("{adminID}")]
        public async Task<IActionResult> DeleteAdmin(int adminID)
        {
            try
            {
                int currentAdminID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                var admin = await _adminRepository.GetAdminByID(currentAdminID);
                if (!admin.IsVerified) return BadRequest();

                if (!await _adminRepository.AdminExists(adminID)) return NotFound();

                var result = await _adminRepository.DeleteAdmin(adminID);
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

        [MapToApiVersion("1.0")]
        [HttpPost]
        [Route("ValidateUsernameOrEmail")]
        public async Task<IActionResult> ValidateUsernameOrEmail([FromBody] string username)
        {
            if(await _adminRepository.AdminExists(username)) return Ok();
            return NotFound();
        }

        [MapToApiVersion("1.0")]
        [HttpPost]
        [Route("UpdatePassword")]
        public async Task<IActionResult> UpdatePassword(LoginDto credentials)
        {
            var adminToUpdate = await _adminRepository.GetAdminByUsername(credentials.UserName);
            if (adminToUpdate != null)
            {
                using (HMACSHA512? hmac = new HMACSHA512())
                {
                    adminToUpdate.PasswordSalt = hmac.Key;
                    adminToUpdate.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(credentials.Password));
                }

                var result = await _adminRepository.UpdateAdmin(adminToUpdate);

                if (result) return Ok();
            }

            return NotFound("Could not find any admin with matching username or email!");
        }

        [MapToApiVersion("1.0")]
        [Authorize(Roles ="Admin")]
        [HttpPost("AllowAdminAccess/{adminID}")]
        public async Task<IActionResult> AllowAdminAccess(int adminID)
        {
            try
            {
                int currentAdminID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);
                var admin = await _adminRepository.GetAdminByID(currentAdminID);

                if (adminID == admin.ID) return BadRequest();

                if(!admin.IsVerified) return Unauthorized();

                var adminToUpdate = await _adminRepository.GetAdminByID(adminID);
                if (adminToUpdate == null) return NotFound();

                adminToUpdate.IsVerified = true;
                var result = await _adminRepository.UpdateAdmin(adminToUpdate);
                if (result) return Ok();

                return StatusCode(500, "An internal error occured!");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
