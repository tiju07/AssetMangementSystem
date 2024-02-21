using AssetManagementSystem.Interfaces;
using AssetManagementSystem;
using AutoMapper;
using Moq;
using AutoFixture;
using AssetManagementSystem.Controllers;
using Microsoft.Extensions.Options;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AssetManagementSystemTestProject
{
	internal class AuthControllerTests
	{
		private Mock<IOptions<AppSettings>> _applicationSettings;
		private Mock<IAdminRepository> _adminRepositoryMock;
		private Mock<IEmployeeRepository> _employeeRepositoryMock;
		private Mock<IAuthUtilityRepository> _authUtilityRepositoryMock;
		private Mock<IMapper> _mapperMock;
		private Fixture _fixture;
		private AuthController _controller;
		private Mock<ILogger<AuthController>> _loggerMock;
		[SetUp]
		public void SetUp()
		{
			var sampleOptions = new AppSettings
			{
				Secret = "SomeRandomTextSomeRandomTextSomeRandomTextSomeRandomTextSomeRandomTextSomeRandomTextSomeRandomTextSomeRandomTextSomeRandomTextSomeRandomTextSomeRandomTextSomeRandomTextSomeRandomTextSomeRandomText",
			};

			_applicationSettings = new Mock<IOptions<AppSettings>>();

			_adminRepositoryMock = new Mock<IAdminRepository>();
			_employeeRepositoryMock = new Mock<IEmployeeRepository>();
			_authUtilityRepositoryMock = new Mock<IAuthUtilityRepository>();
			_mapperMock = new Mock<IMapper>();
			_fixture = new Fixture();
			_loggerMock = new Mock<ILogger<AuthController>>();

			_controller = new AuthController(_applicationSettings.Object, _adminRepositoryMock.Object, _employeeRepositoryMock.Object, _authUtilityRepositoryMock.Object, _mapperMock.Object, _loggerMock.Object);

			_fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
	.ForEach(b => _fixture.Behaviors.Remove(b));
			_fixture.Behaviors.Add(new OmitOnRecursionBehavior());
		}

		[Test]
		public void RegisterAdmin_ReturnsOk()
		{
			var registrationData = _fixture.Create<RegistrationDto>();
			var admin = _fixture.Create<Admin>();
			var mappedAdmin = _fixture.Create<AdminDto>();

			registrationData.ConfirmPassword = registrationData.Password;

			_mapperMock.Setup(m => m.Map<AdminDto>(It.IsAny<RegistrationDto>())).Returns(mappedAdmin);

			_adminRepositoryMock.Setup(a => a.AdminExists(It.IsAny<AdminDto>())).Returns(false);
			_employeeRepositoryMock.Setup(e => e.EmployeeExists(It.IsAny<string>())).Returns(false);

			_mapperMock.Setup(m => m.Map<Admin>(It.IsAny<RegistrationDto>())).Returns(admin);

			_adminRepositoryMock.Setup(a => a.CreateAdmin(It.IsAny<Admin>())).Returns(true);

			//Act
			var result = _controller.RegisterAdmin(registrationData);
			var obj = result as OkObjectResult;

			//Assert
			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void RegisterEmployee_ReturnsOk()
		{
			var registrationData = _fixture.Create<RegistrationDto>();
			var employee = _fixture.Create<Employee>();
			var mappedEmployee = _fixture.Create<EmployeeDto>();

			registrationData.ConfirmPassword = registrationData.Password;

			_mapperMock.Setup(m => m.Map<EmployeeDto>(It.IsAny<RegistrationDto>())).Returns(mappedEmployee);

			_adminRepositoryMock.Setup(a => a.AdminExists(It.IsAny<string>())).Returns(false);
			_employeeRepositoryMock.Setup(e => e.EmployeeExists(It.IsAny<EmployeeDto>())).Returns(false);

			_mapperMock.Setup(m => m.Map<Employee>(It.IsAny<EmployeeDto>())).Returns(employee);

			_employeeRepositoryMock.Setup(a => a.CreateEmployee(It.IsAny<Employee>())).Returns(true);

			//Act
			var result = _controller.RegisterEmployee(registrationData);
			var obj = result as OkObjectResult;

			//Assert
			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void LoginAdmin_ReturnsOk()
		{
			var loginCredentials = _fixture.Create<LoginDto>();
			var admin = _fixture.Create<Admin>();

			_adminRepositoryMock.Setup(a => a.GetAdminByUsername(It.IsAny<string>())).Returns(admin);

			_authUtilityRepositoryMock.Setup(a => a.CheckPassword(It.IsAny<string>(), It.IsAny<byte[]>(), It.IsAny<byte[]>())).Returns(true);

			//Act
			var result = _controller.AdminLogin(loginCredentials);
			var obj = result as OkObjectResult;

			//Assert
			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void EmployeeLogin_ReturnsOk()
		{
			var loginCredentials = _fixture.Create<LoginDto>();
			var employee = _fixture.Create<Employee>();

			_employeeRepositoryMock.Setup(a => a.GetEmployeeByUserName(It.IsAny<string>())).Returns(employee);

			_authUtilityRepositoryMock.Setup(a => a.CheckPassword(It.IsAny<string>(), It.IsAny<byte[]>(), It.IsAny<byte[]>())).Returns(true);

			//Act
			var result = _controller.EmployeeLogin(loginCredentials);
			var obj = result as OkObjectResult;

			//Assert
			Assert.AreEqual(200, obj.StatusCode);
		}
	}
}
