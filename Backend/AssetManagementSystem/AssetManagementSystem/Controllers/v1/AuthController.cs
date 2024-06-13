using Asp.Versioning;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace AssetManagementSystem.Controllers.v1
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiversion}")]
    [ApiController]
    [EnableCors]
    public class AuthController : ControllerBase
    {
        private readonly AppSettings _applicationSettings;
        private readonly IAdminRepository _adminRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IAuthUtilityRepository _authUtilityRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<AuthController> _logger;
        private readonly IEmailService _emailService;

        public AuthController(IOptions<AppSettings> applicationSettings, IAdminRepository adminRepository, IEmployeeRepository employeeRepository, IAuthUtilityRepository authUtilityRepository, IMapper mapper, ILogger<AuthController> logger, IEmailService emailService)
        {
            _applicationSettings = applicationSettings.Value;
            _adminRepository = adminRepository;
            _employeeRepository = employeeRepository;
            _authUtilityRepository = authUtilityRepository;
            _mapper = mapper;
            _logger = logger;
            _emailService = emailService;
        }

        [MapToApiVersion("1.0")]
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
                    adminToCreate.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registrationData.Password));
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
                _logger.LogCritical($"Exception error: ", ex.Message);
                return StatusCode(500, "An error occured at the server!");
            }
        }

        [MapToApiVersion("1.0")]
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
                    employeeToCreate.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registrationData.Password));
                }

                var result = _employeeRepository.CreateEmployee(employeeToCreate);

                if (result) return Ok(employeeToCreate);

                ModelState.AddModelError("Error", "There was an error creating the employee!");
                return StatusCode(500, ModelState);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: ", ex.Message);
                return StatusCode(500, "An error occured at the server!");
            }
        }

        //[MapToApiVersion("1.0")]
        //[HttpPost("Admin/Login")]
        //public IActionResult AdminLogin(LoginDto loginCredentials)
        //{
        //    try
        //    {
        //        if (loginCredentials == null) return BadRequest(ModelState);

        //        var admin = _adminRepository.GetAdminByUsername(loginCredentials.UserName);
        //        if (admin == null) return BadRequest("Invalid Username or Password!");

        //        if (!admin.IsVerified) return BadRequest("Your cannot login to your account as it is not verified!");

        //        var match = _authUtilityRepository.CheckPassword(loginCredentials.Password, admin.PasswordSalt, admin.PasswordHash);

        //        if (!match) return BadRequest("Invalid Username or Password!");

        //        var jwt = _authUtilityRepository.JwtGenerator(admin.ID, admin.Name, "Admin");
        //        try
        //        {
        //            HttpContext.Response.Cookies.Append("token", jwt.token,
        //                new CookieOptions
        //                {
        //                    Expires = DateTime.UtcNow.AddDays(7),
        //                    HttpOnly = true,
        //                    Secure = true,
        //                    IsEssential = true,
        //                    SameSite = SameSiteMode.None
        //                });
        //        }
        //        catch (Exception ex) { return Ok(jwt); }

        //        return Ok(jwt);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogCritical($"Exception error: {ex.Message}");
        //        return StatusCode(500, "An error occured at the server!");
        //    }
        //}

        //[MapToApiVersion("1.0")]
        //[HttpPost("Employee/Login")]
        //public IActionResult EmployeeLogin(LoginDto loginCredentials)
        //{
        //    try
        //    {
        //        if (loginCredentials == null) return BadRequest(ModelState);

        //        var employee = _employeeRepository.GetEmployeeByUserName(loginCredentials.UserName);
        //        if (employee == null) return BadRequest("Invalid Username or Password!");

        //        var match = _authUtilityRepository.CheckPassword(loginCredentials.Password, employee.PasswordSalt, employee.PasswordHash);

        //        if (!match) return BadRequest("Invalid Username or Password!");

        //        var jwt = _authUtilityRepository.JwtGenerator(employee.ID, employee.Name, "Employee");

        //        try
        //        {
        //            HttpContext.Response.Cookies.Append("token", jwt.token,
        //                new CookieOptions
        //                {
        //                    Expires = DateTime.UtcNow.AddDays(7),
        //                    HttpOnly = true,
        //                    Secure = true,
        //                    IsEssential = true,
        //                    SameSite = SameSiteMode.None
        //                });
        //        }
        //        catch (Exception ex) { return Ok(jwt); }

        //        return Ok(jwt);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogCritical($"Exception error: {ex.Message}");
        //        return StatusCode(500, "An error occured at the server!");
        //    }
        //}

        [MapToApiVersion("1.0")]
        [HttpPost("Login")]
        public IActionResult Login(LoginDto credentials)
        {
            if (credentials == null) return BadRequest(ModelState);

            var admin = _adminRepository.GetAdminByUsername(credentials.UserName);
            var employee = _employeeRepository.GetEmployeeByUserName(credentials.UserName);
            if(admin == null && employee == null) return BadRequest("Invalid Username or Password!");

            if(admin != null)
            {
                if (!admin.IsVerified) return BadRequest("Invalid Username or Password!");

                var match = _authUtilityRepository.CheckPassword(credentials.Password, admin.PasswordSalt, admin.PasswordHash);

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
            else
            {
                var match = _authUtilityRepository.CheckPassword(credentials.Password, employee.PasswordSalt, employee.PasswordHash);

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
        }

        [MapToApiVersion("1.0")]
        [HttpPost]
        [Route("Logout")]
        public IActionResult Logout()
        {
            try
            {
                Response.Cookies.Delete("token");
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                ModelState.AddModelError("Error", "Error signing out!");
                return StatusCode(500, ModelState);
            }
        }

        [MapToApiVersion("1.0")]
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto forgotPassword)
        {
            var admin = _adminRepository.GetAdminByUsername(forgotPassword.Email);
            var employee = _employeeRepository.GetEmployeeByUserName(forgotPassword.Email);

            if (admin != null)
            {
                var jwt = _authUtilityRepository.JwtGenerator(admin.ID, admin.Name, "Admin");
                string body = $"Reset Password Link: http://localhost:4200/forgot-password/{jwt.token}/{admin.Email}";
                await _emailService.Send("tijulukose0402@gmail.com", "Test", body);
            }
            if (employee != null)
            {
                var jwt = _authUtilityRepository.JwtGenerator(employee.ID, employee.Name, "Employee");
                string body = $"Reset Password Link: http://localhost:4200/forgot-password/{jwt.token}/{employee.Email}";
                await _emailService.Send("tijulukose0402@gmail.com", "Test", body);
            }
            return Ok();
        }

    }
}
