using AssetManagementSystem.Controllers;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using AssetManagementSystem.Repository;
using AssetManagementSystem.ViewModels;
using AutoFixture;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

		[SetUp]
		public void SetUp()
		{
			_employeeRepositoryMock = new Mock<IEmployeeRepository>();
			_mapperMock = new Mock<IMapper>();
			_fixture = new Fixture();
			_controller = new EmployeesController(_employeeRepositoryMock.Object, _mapperMock.Object);

			_fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
	.ForEach(b => _fixture.Behaviors.Remove(b));
			_fixture.Behaviors.Add(new OmitOnRecursionBehavior());
		}

		[Test]
		public void GetAllEmployees_ReturnsOk()
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
			var result = _controller.GetAllEmployees();
			var obj = result as OkObjectResult;

			//Assert
			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void GetEmployeeByID_ReturnsOk()
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


			_employeeRepositoryMock.Setup(repo => repo.EmployeeExists(It.IsAny<int>())).Returns(true);

			_mapperMock.Setup(m => m.Map<EmployeeAdminViewModel>(It.IsAny<Employee>())).Returns(employeeVM);

			//Act
			var result = _controller.GetEmployeeByID(1);
			var obj = result as OkObjectResult;

			//Assert
			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void UpdateEmployee_ReturnsOk()
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

			_employeeRepositoryMock.Setup<EmployeeAdminViewModel>(a => a.GetEmployeeByID(It.IsAny<int>())).Returns(employeeVM);

			_employeeRepositoryMock.Setup(e => e.GetEmployeeByIDWithCredentials(It.IsAny<int>())).Returns(employee);

			_employeeRepositoryMock.Setup(a => a.EmployeeExists(It.IsAny<EmployeeDto>())).Returns(false);

			_employeeRepositoryMock.Setup(a => a.UpdateEmployee(It.IsAny<Employee>())).Returns(true);

			var result = _controller.UpdateEmployee(employee.ID, mappedEmployee);
			var obj = result as NoContentResult;

			Assert.AreEqual(204, obj.StatusCode);
		}

		[Test]
		public void DeleteEmployee_ReturnsOk()
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

			_employeeRepositoryMock.Setup(a => a.EmployeeExists(It.IsAny<int>())).Returns(true);

			_employeeRepositoryMock.Setup(a => a.DeleteEmployee(It.IsAny<int>())).Returns(true);

			var result = _controller.DeleteEmployee(admin.ID);
			var obj = result as OkResult;

			Assert.AreEqual(200, obj.StatusCode);
		}
	}
}
