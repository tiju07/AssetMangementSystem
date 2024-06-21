using AssetManagementSystem.Controllers.v1;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using AssetManagementSystem.Repository;
using AssetManagementSystem.ViewModels;
using AutoFixture;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagementSystemTestProject
{
    internal class EmployeesControllerTests
	{
		private Mock<IEmployeeRepository> _employeeRepositoryMock;
		private Mock<IMapper> _mapperMock;
		private Fixture _fixture;
		private EmployeesController _controller;
		private Mock<ILogger<EmployeesController>> _loggerMock;

		[SetUp]
		public async Task SetUp()
		{
			_employeeRepositoryMock = new Mock<IEmployeeRepository>();
			_mapperMock = new Mock<IMapper>();
			_fixture = new Fixture();
			_loggerMock = new Mock<ILogger<EmployeesController>>();

			_controller = new EmployeesController(_employeeRepositoryMock.Object, _mapperMock.Object, _loggerMock.Object);

			_fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
	.ForEach(b => _fixture.Behaviors.Remove(b));
			_fixture.Behaviors.Add(new OmitOnRecursionBehavior());
		}

		[Test]
		public async Task GetAllEmployees_ReturnsOk()
		{
			// Arrange
			var admin = _fixture.Create<Admin>();

			var adminClaims = new List<Claim>
			{
				new Claim("id", admin.ID.ToString()),
				new Claim(ClaimTypes.Role, "Admin")
			};

			var identity = new ClaimsIdentity(adminClaims, "TestAuthType");
			var principal = new ClaimsPrincipal(identity);

			_controller.ControllerContext = new ControllerContext
			{
				HttpContext = new DefaultHttpContext { User = principal }
			};

			var employees = _fixture.CreateMany<EmployeeAdminViewModel>().ToList();

			_mapperMock.Setup(m => m.Map<ICollection<EmployeeAdminViewModel>>(It.IsAny<Employee>)).Returns(employees);

			//Act
			var result = await _controller.GetAllEmployees();
			var obj = result as OkObjectResult;

			//Assert
			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public async Task GetEmployeeByID_ReturnsOk()
		{
			// Arrange
			var admin = _fixture.Create<Admin>();
			var employeeVM = _fixture.Create<EmployeeAdminViewModel>();

			var adminClaims = new List<Claim>
			{
				new Claim("id", admin.ID.ToString()),
				new Claim(ClaimTypes.Role, "Admin")
			};

			var identity = new ClaimsIdentity(adminClaims, "TestAuthType");
			var principal = new ClaimsPrincipal(identity);

			_controller.ControllerContext = new ControllerContext
			{
				HttpContext = new DefaultHttpContext { User = principal }
			};


			_employeeRepositoryMock.Setup(repo => repo.EmployeeExists(It.IsAny<int>())).Returns(Task.FromResult(true));

			_mapperMock.Setup(m => m.Map<EmployeeAdminViewModel>(It.IsAny<Employee>())).Returns(employeeVM);

			//Act
			var result = await _controller.GetEmployeeByID(1);
			var obj = result as OkObjectResult;

			//Assert
			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public async Task UpdateEmployee_ReturnsOk()
		{
			var admin = _fixture.Create<Admin>();
			var employee = _fixture.Create<Employee>();
			var employeeVM = _fixture.Create<EmployeeAdminViewModel>();
			var mappedEmployee = _fixture.Create<EmployeeDto>();
			mappedEmployee.ID = employee.ID;
			employeeVM.ID = employee.ID;

			var claims = new Claim[]
			{
				new Claim ("id", admin.ID.ToString()),
				new Claim (ClaimTypes.Role, "Admin")
			};

			var identity = new ClaimsIdentity(claims);

			var principal = new ClaimsPrincipal(identity);

			_controller.ControllerContext = new ControllerContext
			{
				HttpContext = new DefaultHttpContext
				{
					User = principal
				}
			};

			_mapperMock.Setup<Employee>(m => m.Map<Employee>(It.IsAny<EmployeeDto>())).Returns(employee);

			_employeeRepositoryMock.Setup(a => a.GetEmployeeByID(It.IsAny<int>())).Returns(Task.FromResult(employeeVM));

			_employeeRepositoryMock.Setup(e => e.GetEmployeeByIDWithCredentials(It.IsAny<int>())).Returns(Task.FromResult(employee));

			_employeeRepositoryMock.Setup(a => a.EmployeeExists(It.IsAny<EmployeeDto>())).Returns(Task.FromResult(false));

			_employeeRepositoryMock.Setup(a => a.UpdateEmployee(It.IsAny<Employee>())).Returns(Task.FromResult(true));

			var result = await _controller.UpdateEmployee(employee.ID, mappedEmployee);
			var obj = result as NoContentResult;

			Assert.AreEqual(204, obj.StatusCode);
		}

		[Test]
		public async Task DeleteEmployee_ReturnsOk()
		{
			var admin = _fixture.Create<Admin>();

			var claims = new Claim[]
			{
				new Claim ("id", admin.ID.ToString()),
				new Claim (ClaimTypes.Role, "Admin")
			};

			var identity = new ClaimsIdentity(claims);

			var principal = new ClaimsPrincipal(identity);

			_controller.ControllerContext = new ControllerContext
			{
				HttpContext = new DefaultHttpContext
				{
					User = principal
				}
			};

			_employeeRepositoryMock.Setup(a => a.EmployeeExists(It.IsAny<int>())).Returns(Task.FromResult(true));

			_employeeRepositoryMock.Setup(a => a.DeleteEmployee(It.IsAny<int>())).Returns(Task.FromResult(true));

			var result = await _controller.DeleteEmployee(admin.ID);
			var obj = result as OkResult;

			Assert.AreEqual(200, obj.StatusCode);
		}
	}
}
