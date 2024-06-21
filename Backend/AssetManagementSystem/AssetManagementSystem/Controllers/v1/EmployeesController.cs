using Microsoft.AspNetCore.Mvc;
using AssetManagementSystem.Models;
using AssetManagementSystem.Interfaces;
using AutoMapper;
using AssetManagementSystem.Dto;
using AssetManagementSystem.ViewModels;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Asp.Versioning;
using Microsoft.AspNetCore.Cors;
using AssetManagementSystem.Repository;
using System.Security.Cryptography;
using System.Text;

namespace AssetManagementSystem.Controllers.v1
{
	[ApiVersion("1.0")]
	[Route("api/v{version:apiversion}/Employees")]
    [ApiController]
    [EnableCors]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<EmployeesController> _logger;

        public EmployeesController(IEmployeeRepository employeeRepository, IMapper mapper, ILogger<EmployeesController> logger)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
            _logger = logger;
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            try
            {
                var employees = _mapper.Map<ICollection<EmployeeAdminViewModel>>(await _employeeRepository.GetAllEmployees());

                return Ok(employees);
            }
            catch (Exception ex)
            {
				_logger.LogCritical($"Exception error: {ex.Message}");
				return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin, Employee")]
        [HttpGet("{employeeID}")]
        public async Task<IActionResult> GetEmployeeByID(int employeeID)
        {
            try
            {
                string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

                int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (currentUserRole != "Admin" && currentUserID != employeeID) return Unauthorized();

                if (!await _employeeRepository.EmployeeExists(employeeID)) return NotFound();

                var employee = _mapper.Map<EmployeeAdminViewModel>(await _employeeRepository.GetEmployeeByID(employeeID));

                return Ok(employee);
            }
            catch (Exception ex)
            {
				_logger.LogCritical($"Exception error: {ex.Message}");
				return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Employee")]
        [HttpPut("{employeeID}")]
        public async Task<IActionResult> UpdateEmployee(int employeeID, EmployeeDto employee)
        {
            try
            {
                if (employeeID != employee.ID)
                {
                    return BadRequest();
                }

                string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

                int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (currentUserRole != "Admin" && currentUserID != employeeID) return Unauthorized();

                if (!ModelState.IsValid) return BadRequest(ModelState);

                var employeeToUpdate = _mapper.Map<Employee>(employee);

                if (await _employeeRepository.EmployeeExists(_mapper.Map<EmployeeDto>(employeeToUpdate)))
                {
                    return BadRequest("A user with the given details already exists!");
                }

                var originalData = await _employeeRepository.GetEmployeeByIDWithCredentials(employeeID);

                employeeToUpdate.PasswordHash = originalData.PasswordHash;
                employeeToUpdate.PasswordSalt = originalData.PasswordSalt;

                var result = await _employeeRepository.UpdateEmployee(employeeToUpdate);

                if (result) return NoContent();

                ModelState.AddModelError("Error", "There was an error updating the employee details!");
                return StatusCode(500, ModelState);
            }
            catch (Exception ex)
            {
				_logger.LogCritical($"Exception error: {ex.Message}");
				return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin, Employee")]
        [HttpDelete("{employeeID}")]
        public async Task<IActionResult> DeleteEmployee(int employeeID)
        {
            try
            {
                string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

                int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

                if (currentUserRole != "Admin" && currentUserID != employeeID) return Unauthorized();

                if (!await _employeeRepository.EmployeeExists(employeeID)) return NotFound();

                var result = await _employeeRepository.DeleteEmployee(employeeID);

                if (result) return Ok();

                ModelState.AddModelError("Error", "An error occured deleting the employee!");
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
            if (await _employeeRepository.EmployeeExists(username)) return Ok();
            return NotFound();
        }

        [MapToApiVersion("1.0")]
        [HttpPost]
        [Route("UpdatePassword")]
        public async Task<IActionResult> UpdatePassword(LoginDto credentials)
        {
            //Will get by both checking username & email
            var employeeToUpdate = await _employeeRepository.GetEmployeeByUserName(credentials.UserName);
            if (employeeToUpdate != null)
            {
                using (HMACSHA512? hmac = new HMACSHA512())
                {
                    employeeToUpdate.PasswordSalt = hmac.Key;
                    employeeToUpdate.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(credentials.Password));
                }

                var result = await _employeeRepository.UpdateEmployee(employeeToUpdate);

                if (result) return Ok();

                else return StatusCode(500, "An error occured at the server!");
            }

            return NotFound("Could not find any employee with matching username or email!");
        }
    }
}