using AssetManagementSystem.Controllers.v1;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using AssetManagementSystem.Repository;
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
    class AssetAuditReportRequestsControllerTests
	{

		private Mock<IAssetAuditReportRequestRepository> _assetAuditReportRequestRepositoryMock;
		private Mock<IEmployeeRepository> _employeeRepositoryMock;
		private Mock<IAssetCatalogueRepository> _assetCatalogueRepositoryMock;
		private Mock<IAssetAllocationRepository> _assetAllocationRepositoryMock;
		private Mock<IMapper> _mapperMock;
		private Fixture _fixture;
		private AssetAuditReportRequestsController _controller;
		private Mock<ILogger<AssetAuditReportRequestsController>> _loggerMock;

		[SetUp]
		public void SetUp()
		{
			_assetAuditReportRequestRepositoryMock = new Mock<IAssetAuditReportRequestRepository>();
			_employeeRepositoryMock = new Mock<IEmployeeRepository>();
			_assetCatalogueRepositoryMock = new Mock<IAssetCatalogueRepository>();
			_assetAllocationRepositoryMock = new Mock<IAssetAllocationRepository>();
			_mapperMock = new Mock<IMapper>();
			_fixture = new Fixture();
			_loggerMock = new Mock<ILogger<AssetAuditReportRequestsController>>();

			_controller = new AssetAuditReportRequestsController(_assetAuditReportRequestRepositoryMock.Object, _employeeRepositoryMock.Object, _assetCatalogueRepositoryMock.Object, _assetAllocationRepositoryMock.Object, _mapperMock.Object, _loggerMock.Object);

			_fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
	.ForEach(b => _fixture.Behaviors.Remove(b));
			_fixture.Behaviors.Add(new OmitOnRecursionBehavior());
		}

		[Test]
		public void GetAssetAuditReportRequests_ReturnsOk()
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

			var requests = _fixture.CreateMany<AssetAuditReportRequestDto>(5).ToList();

			_mapperMock.Setup(m => m.Map<ICollection<AssetAuditReportRequestDto>>(It.IsAny<AssetAuditReportRequest>)).Returns(requests);

			var result = _controller.GetAssetAuditReportRequests();
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void GetAssetAuditReportRequestByID_ReturnsOk()
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

			var request = _fixture.Create<AssetAuditReportRequestDto>();

			_assetAuditReportRequestRepositoryMock.Setup(a => a.AssetAuditReportRequestExists(It.IsAny<int>())).Returns(true);

			_mapperMock.Setup(m => m.Map<AssetAuditReportRequestDto>(It.IsAny<AssetAuditReportRequest>())).Returns(request);

			var result = _controller.GetAssetAuditReportRequestByID(1);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void GetAssetAuditReportRequestByEmployee_ReturnsOk()
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

			var requests = _fixture.CreateMany<AssetAuditReportRequestDto>(5).ToList();

			_employeeRepositoryMock.Setup(a => a.EmployeeExists(It.IsAny<int>())).Returns(true);

			_mapperMock.Setup(m => m.Map<ICollection<AssetAuditReportRequestDto>>(It.IsAny<AssetAuditReportRequest>())).Returns(requests);

			var result = _controller.GetAssetAuditReportRequestByEmployee(1);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void CreateAssetAllocationDetail_ReturnsOk()
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

			var request = _fixture.Create<AssetAuditReportRequest>();
			var mappedRequest = _fixture.Create<AssetAuditReportRequestDto>();
			mappedRequest.RequestStatus = "Pending";
			_employeeRepositoryMock.Setup(a => a.EmployeeExists(It.IsAny<int>())).Returns(true);

			_assetCatalogueRepositoryMock.Setup(a => a.AssetExists(It.IsAny<int>())).Returns(true);

			_mapperMock.Setup(m => m.Map<AssetAuditReportRequest>(It.IsAny<AssetAuditReportRequestDto>())).Returns(request);

			_assetAuditReportRequestRepositoryMock.Setup(a => a.CreateAuditRequest(It.IsAny<AssetAuditReportRequest>())).Returns(true);

			var result = _controller.CreateAssetAuditReportRequest(mappedRequest);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void UpdateAssetAuditReportRequest_ReturnsOk()
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

			var request = _fixture.Create<AssetAuditReportRequest>();
			var mappedRequest = _fixture.Create<AssetAuditReportRequestDto>();
			mappedRequest.RequestStatus = "Pending";

			_assetAuditReportRequestRepositoryMock.Setup(a => a.AssetAuditReportRequestExists(It.IsAny<int>())).Returns(true);

			_employeeRepositoryMock.Setup(a => a.EmployeeExists(It.IsAny<int>())).Returns(true);

			_assetCatalogueRepositoryMock.Setup(a => a.AssetExists(It.IsAny<int>())).Returns(true);

			_mapperMock.Setup(m => m.Map<AssetAuditReportRequest>(It.IsAny<AssetAuditReportRequestDto>())).Returns(request);

			_assetAuditReportRequestRepositoryMock.Setup(a => a.UpdateAuditRequest(It.IsAny<AssetAuditReportRequest>())).Returns(true);

			var result = _controller.UpdateAssetAuditReportRequest(mappedRequest.RequestID, mappedRequest);
			var obj = result as NoContentResult;

			Assert.AreEqual(204, obj.StatusCode);
		}
	}
}
