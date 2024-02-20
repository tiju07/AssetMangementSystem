using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace AssetManagementSystem.Controllers
{
	[Route("api")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly AppSettings _applicationSettings;
		private readonly IAdminRepository _adminRepository;
		private readonly IEmployeeRepository _employeeRepository;
		private readonly IAuthUtilityRepository _authUtilityRepository;
		private readonly IMapper _mapper;

		public AuthController(IOptions<AppSettings> applicationSettings, IAdminRepository adminRepository, IEmployeeRepository employeeRepository, IAuthUtilityRepository authUtilityRepository, IMapper mapper)
		{
			_applicationSettings = applicationSettings.Value;
			_adminRepository = adminRepository;
			_employeeRepository = employeeRepository;
			_authUtilityRepository = authUtilityRepository;
			_mapper = mapper;
		}

		[HttpPost("Admin/Register")]
		public IActionResult RegisterAdmin(RegistrationDto registrationData)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					return BadRequest(ModelState);
				}
				if (registrationData.Password != registrationData.ConfirmPassword)
				{
					ModelState.AddModelError("Error", "Passwords in the fields do not match!");
					return BadRequest(ModelState);
				}

				AdminDto admin = _mapper.Map<AdminDto>(registrationData);


				if (_adminRepository.AdminExists(admin) || _employeeRepository.EmployeeExists(admin.Email))
				{
					ModelState.AddModelError("Error", "A user with the email already exists!");
					return BadRequest(ModelState);
				}

				var adminToCreate = _mapper.Map<Admin>(registrationData);

				using (HMACSHA512? hmac = new HMACSHA512())
				{
					adminToCreate.PasswordSalt = hmac.Key;
					adminToCreate.PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registrationData.Password));
				}

				var result = _adminRepository.CreateAdmin(adminToCreate);

				if (result)
				{
					return Ok(adminToCreate);
				}

				ModelState.AddModelError("Error", "An error occuerd while creating the admin!");
				return StatusCode(500, ModelState);
			}
			catch (Exception ex)
			{
				//Add a log here with details as from ex.Message
				return StatusCode(500, "An error occured at the server!");
			}
		}

		[HttpPost("Employee/Register")]
		public IActionResult RegisterEmployee(RegistrationDto registrationData)
		{
			try
			{
				if (!ModelState.IsValid) return BadRequest(ModelState);

				if (registrationData.Password != registrationData.ConfirmPassword)
				{
					ModelState.AddModelError("Error", "Passwords in the fields do not match!");
					return BadRequest(ModelState);
				}

				var employee = _mapper.Map<EmployeeDto>(registrationData);

				if (_employeeRepository.EmployeeExists(employee) || _adminRepository.AdminExists(employee.Email))
				{
					return BadRequest("A user with the email already exists!");
				}

				var employeeToCreate = _mapper.Map<Employee>(employee);

				using (HMACSHA512? hmac = new HMACSHA512())
				{
					employeeToCreate.PasswordSalt = hmac.Key;
					employeeToCreate.PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registrationData.Password));
				}

				var result = _employeeRepository.CreateEmployee(employeeToCreate);

				if (result) return Ok(employeeToCreate);

				ModelState.AddModelError("Error", "There was an error creating the employee!");
				return StatusCode(500, ModelState);
			}
			catch (Exception ex)
			{
				//Add a log here with details as from ex.Message
				return StatusCode(500, "An error occured at the server!");
			}
		}

		[HttpPost("Admin/Login")]
		public IActionResult AdminLogin(LoginDto loginCredentials)
		{
			try
			{
				if (loginCredentials == null) return BadRequest(ModelState);

				var admin = _adminRepository.GetAdminByUsername(loginCredentials.UserName);
				if (admin == null) return BadRequest("Invalid Username or Password!");

				var match = _authUtilityRepository.CheckPassword(loginCredentials.Password, admin.PasswordSalt, admin.PasswordHash);

				if (!match) return BadRequest("Invalid Username or Password!");

				var jwt = _authUtilityRepository.JwtGenerator(admin.ID, admin.Name, "Admin");
				try
				{
					HttpContext.Response.Cookies.Append("token", jwt.token,
						new CookieOptions
						{
							Expires = DateTime.UtcNow.AddDays(7),
							HttpOnly = true,
							Secure = true,
							IsEssential = true,
							SameSite = SameSiteMode.None
						});
				}
				catch (Exception ex) { return Ok(jwt); }

				return Ok(jwt);
			}
			catch (Exception ex)
			{
				//Add a log here with details as from ex.Message
				return StatusCode(500, "An error occured at the server!");
			}
		}

		[HttpPost("Employee/Login")]
		public IActionResult EmployeeLogin(LoginDto loginCredentials)
		{
			try
			{
				if (loginCredentials == null) return BadRequest(ModelState);

				var employee = _employeeRepository.GetEmployeeByUserName(loginCredentials.UserName);
				if (employee == null) return BadRequest("Invalid Username or Password!");

				var match = _authUtilityRepository.CheckPassword(loginCredentials.Password, employee.PasswordSalt, employee.PasswordHash);

				if (!match) return BadRequest("Invalid Username or Password!");

				var jwt = _authUtilityRepository.JwtGenerator(employee.ID, employee.Name, "Employee");

				try
				{
					HttpContext.Response.Cookies.Append("token", jwt.token,
						new CookieOptions
						{
							Expires = DateTime.UtcNow.AddDays(7),
							HttpOnly = true,
							Secure = true,
							IsEssential = true,
							SameSite = SameSiteMode.None
						});
				}
				catch (Exception ex) { return Ok(jwt); }

				return Ok(jwt);
			}
			catch (Exception ex)
			{
				//Add a log here with details as from ex.Message
				return StatusCode(500, "An error occured at the server!");
			}
		}

		[Authorize(Roles = "Admin, Employee")]
		[HttpPost("Logout")]
		public IActionResult Logout()
		{
			try
			{
				Response.Cookies.Delete("token");
				return Ok();
			}
			catch (Exception ex)
			{
				//Log the error(ex.Message)
				ModelState.AddModelError("Error", "Error signing out!");
				return StatusCode(500, ModelState);
			}
		}
	}
}
