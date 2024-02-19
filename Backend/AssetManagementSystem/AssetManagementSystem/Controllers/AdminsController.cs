using Microsoft.AspNetCore.Mvc;
using AssetManagementSystem.Models;
using AutoMapper;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using Microsoft.AspNetCore.Authorization;
namespace AssetManagementSystem.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/Admins")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
		private readonly IAdminRepository _adminRepository;
        private readonly IMapper _mapper;

        public AdminsController(IAdminRepository adminRepository, IMapper mapper)
        {
			_adminRepository = adminRepository;
            _mapper = mapper;
        }

		[HttpGet("{adminID}")]
        public IActionResult GetAdminByID(int adminID)
        {
            int currentAdminID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

			if (currentAdminID != adminID) return Unauthorized();
         
            if (!_adminRepository.AdminExists(adminID))
            {
                return NotFound();
            }

            var admin = _mapper.Map<AdminDto>(_adminRepository.GetAdminByID(adminID));

			return Ok(admin);
        }

        [HttpPut("{adminID}")]
        public IActionResult UpdateAdmin(int adminID, AdminDto admin)
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

			if (result) return NoContent();

            ModelState.AddModelError("Errors", "An error occuerd while updating admin!");
            return StatusCode(500, ModelState);
        }

        [HttpDelete("{adminID}")]
        public IActionResult DeleteAdmin(int adminID)
        {
			int currentAdminID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

			if (currentAdminID != adminID) return Unauthorized();

			if (!_adminRepository.AdminExists(adminID)) return NotFound();

            var result = _adminRepository.DeleteAdmin(adminID);
            if (result)
            {
                return NoContent();
            }

            ModelState.AddModelError("Error", "An error occuerd while deleting the admin!");
            return StatusCode(500, ModelState);
        }
    }
}
