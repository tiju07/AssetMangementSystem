using AssetManagementSystem.Controllers;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
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
	internal class AssetServiceRequestsControllerTests
	{
		private Mock<IAssetServiceRequestRepository> _assetServiceRequestRepositoryMock;
		private Mock<IEmployeeRepository> _employeeRepositoryMock;
		private Mock<IAssetCatalogueRepository> _assetCatalogueRepositoryMock;
		private Mock<IAssetAllocationRepository> _assetAllocationRepositoryMock;
		private Mock<IMapper> _mapperMock;
		private Fixture _fixture;
		private AssetServiceRequestsController _controller;

		[SetUp]
		public void SetUp()
		{
			_assetServiceRequestRepositoryMock = new Mock<IAssetServiceRequestRepository>();
			_employeeRepositoryMock = new Mock<IEmployeeRepository>();
			_assetCatalogueRepositoryMock = new Mock<IAssetCatalogueRepository>();
			_assetAllocationRepositoryMock = new Mock<IAssetAllocationRepository>();
			_mapperMock = new Mock<IMapper>();
			_fixture = new Fixture();

			_controller = new AssetServiceRequestsController(_assetServiceRequestRepositoryMock.Object, _employeeRepositoryMock.Object, _assetCatalogueRepositoryMock.Object, _assetAllocationRepositoryMock.Object, _mapperMock.Object);

			_fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
	.ForEach(b => _fixture.Behaviors.Remove(b));
			_fixture.Behaviors.Add(new OmitOnRecursionBehavior());
		}

		[Test]
		public void GetAllAssetServiceRequests_ReturnsOk()
		{
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

			var requests = _fixture.CreateMany<AssetServiceRequestDto>(5).ToList();

			_mapperMock.Setup(m => m.Map<ICollection<AssetServiceRequestDto>>(It.IsAny<AssetServiceRequest>)).Returns(requests);

			var result = _controller.GetAllAssetServiceRequests();
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void GetAssetServiceRequestByID_ReturnsOk()
		{
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

			var request = _fixture.Create<AssetServiceRequestDto>();

			_assetServiceRequestRepositoryMock.Setup(a => a.ServiceRequestExists(It.IsAny<int>())).Returns(true);

			_mapperMock.Setup(m => m.Map<AssetServiceRequestDto>(It.IsAny<AssetServiceRequest>())).Returns(request);

			var result = _controller.GetAssetServiceRequestByID(1);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void GetAssetServiceRequestByEmployee_ReturnsOk()
		{
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

			var requests = _fixture.CreateMany<AssetServiceRequestDto>(5).ToList();

			_employeeRepositoryMock.Setup(a => a.EmployeeExists(It.IsAny<int>())).Returns(true);

			_mapperMock.Setup(m => m.Map<ICollection<AssetServiceRequestDto>>(It.IsAny<AssetServiceRequest>())).Returns(requests);

			var result = _controller.GetAssetServiceRequestByEmployee(1);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void CreateAssetBorrowAndReturnRequest_ReturnsOk()
		{
			var employee = _fixture.Create<Employee>();

			var employeeClaims = new List<Claim>
			{
				new Claim("id", employee.ID.ToString()),
				new Claim(ClaimTypes.Role, "Employee")
			};

			var identity = new ClaimsIdentity(employeeClaims, "TestAuthType");
			var principal = new ClaimsPrincipal(identity);

			_controller.ControllerContext = new ControllerContext
			{
				HttpContext = new DefaultHttpContext { User = principal }
			};

			var mappedRequest = _fixture.Create<AssetServiceRequestDto>();
			mappedRequest.EmployeeID = employee.ID;

			
			mappedRequest.IssueType = "Malfunction";
			mappedRequest.RequestStatus = "Open";

			_assetCatalogueRepositoryMock.Setup(a => a.AssetExists(It.IsAny<int>())).Returns(true);

			_assetAllocationRepositoryMock.Setup(a => a.AllocationDetailExists(It.IsAny<int>(), It.IsAny<int>())).Returns(true);

			_assetServiceRequestRepositoryMock.Setup(r => r.CreateServiceRequest(It.IsAny<AssetServiceRequest>())).Returns(true);

			var result = _controller.CreateAssetServiceRequest(mappedRequest);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void UpdateAssetServiceRequest_ReturnsOk()
		{
			var employee = _fixture.Create<Employee>();

			var employeeClaims = new List<Claim>
			{
				new Claim("id", employee.ID.ToString()),
				new Claim(ClaimTypes.Role, "Employee")
			};

			var identity = new ClaimsIdentity(employeeClaims, "TestAuthType");
			var principal = new ClaimsPrincipal(identity);

			_controller.ControllerContext = new ControllerContext
			{
				HttpContext = new DefaultHttpContext { User = principal }
			};

			var mappedRequest = _fixture.Create<AssetServiceRequestDto>();
			mappedRequest.EmployeeID = employee.ID;

			mappedRequest.IssueType = "Malfunction";
			mappedRequest.RequestStatus = "Open";

			_employeeRepositoryMock.Setup(e => e.EmployeeExists(It.IsAny<int>())).Returns(true);

			_assetCatalogueRepositoryMock.Setup(a => a.AssetExists(It.IsAny<int>())).Returns(true);

			_assetAllocationRepositoryMock.Setup(a => a.AllocationDetailExists(It.IsAny<int>(), It.IsAny<int>())).Returns(true);

			_assetServiceRequestRepositoryMock.Setup(r => r.UpdateServiceRequest(It.IsAny<AssetServiceRequest>())).Returns(true);

			var result = _controller.UpdateAssetServiceRequest(mappedRequest.RequestID, mappedRequest);
			var obj = result as NoContentResult;

			Assert.AreEqual(204, obj.StatusCode);
		}
	}
}
