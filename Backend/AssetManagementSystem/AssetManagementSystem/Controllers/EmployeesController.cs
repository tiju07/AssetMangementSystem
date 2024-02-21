using Microsoft.AspNetCore.Mvc;
using AssetManagementSystem.Models;
using AssetManagementSystem.Interfaces;
using AutoMapper;
using AssetManagementSystem.Dto;
using AssetManagementSystem.ViewModels;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace AssetManagementSystem.Controllers
{
	[Route("api/Employees")]
	[ApiController]
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

		[Authorize(Roles = "Admin")]
		[HttpGet]
		public IActionResult GetAllEmployees()
		{
			try
			{
				var employees = _mapper.Map<ICollection<EmployeeAdminViewModel>>(_employeeRepository.GetAllEmployees());

				return Ok(employees);
			}
			catch (Exception ex)
			{
				//Add a log here with details as from ex.Message
				return StatusCode(500, "An error occured at the server!");
			}
		}

		[Authorize(Roles = "Admin, Employee")]
		[HttpGet("{employeeID}")]
		public IActionResult GetEmployeeByID(int employeeID)
		{
			try
			{
				string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

				int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

				if (currentUserRole != "Admin" && currentUserID != employeeID) return Unauthorized();

				if (!_employeeRepository.EmployeeExists(employeeID)) return NotFound();

				var employee = _mapper.Map<EmployeeAdminViewModel>(_employeeRepository.GetEmployeeByID(employeeID));

				return Ok(employee);
			}
			catch (Exception ex)
			{
				//Add a log here with details as from ex.Message
				return StatusCode(500, "An error occured at the server!");
			}
		}

		[Authorize(Roles = "Employee")]
		[HttpPut("{employeeID}")]
		public IActionResult UpdateEmployee(int employeeID, EmployeeDto employee)
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

				if (_employeeRepository.EmployeeExists(_mapper.Map<EmployeeDto>(employeeToUpdate)))
				{
					return BadRequest("A user with the given details already exists!");
				}

				var originalData = _employeeRepository.GetEmployeeByIDWithCredentials(employeeID);

				employeeToUpdate.PasswordHash = originalData.PasswordHash;
				employeeToUpdate.PasswordSalt = originalData.PasswordSalt;

				var result = _employeeRepository.UpdateEmployee(employeeToUpdate);

				if (result) return NoContent();

				ModelState.AddModelError("Error", "There was an error updating the employee details!");
				return StatusCode(500, ModelState);
			}
			catch (Exception ex)
			{
				//Add a log here with details as from ex.Message
				return StatusCode(500, "An error occured at the server!");
			}
		}

		[Authorize(Roles = "Admin, Employee")]
		[HttpDelete("{employeeID}")]
		public IActionResult DeleteEmployee(int employeeID)
		{
			try
			{
				string currentUserRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

				int currentUserID = int.Parse(User.Claims.FirstOrDefault(c => c.Type == "id").Value);

				if (currentUserRole != "Admin" && currentUserID != employeeID) return Unauthorized();

				if (!_employeeRepository.EmployeeExists(employeeID)) return NotFound();

				var result = _employeeRepository.DeleteEmployee(employeeID);

				if (result) return Ok();

				ModelState.AddModelError("Error", "An error occured deleting the employee!");
				return StatusCode(500, ModelState);
			}
			catch (Exception ex)
			{
				//Add a log here with details as from ex.Message
				return StatusCode(500, "An error occured at the server!");
			}
		}
	}
}