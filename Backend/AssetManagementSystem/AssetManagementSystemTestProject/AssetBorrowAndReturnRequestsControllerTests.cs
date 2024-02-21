using AssetManagementSystem.Controllers.v1;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
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
    public class AssetBorrowAndReturnRequestsControllerTests
	{
		private Mock<IAssetBorrowAndReturnRequestRepository> _assetBorrowAndReturnRequestRepositoryMock;
		private Mock<IEmployeeRepository> _employeeRepositoryMock;
		private Mock<IAssetCatalogueRepository> _assetCatalogueRepositoryMock;
		private Mock<IAdminRepository> _adminRepositoryMock;
		private Mock<IMapper> _mapperMock;
		private Fixture _fixture;
		private AssetBorrowAndReturnRequestsController _controller;
		private Mock<ILogger<AssetBorrowAndReturnRequestsController>> _loggerMock;

		[SetUp]
		public void SetUp()
		{
			_assetBorrowAndReturnRequestRepositoryMock = new Mock<IAssetBorrowAndReturnRequestRepository>();
			_employeeRepositoryMock = new Mock<IEmployeeRepository>();
			_assetCatalogueRepositoryMock = new Mock<IAssetCatalogueRepository>();
			_adminRepositoryMock = new Mock<IAdminRepository>();
			_mapperMock = new Mock<IMapper>();
			_fixture = new Fixture();
			_loggerMock = new Mock<ILogger<AssetBorrowAndReturnRequestsController>>();

			_controller = new AssetBorrowAndReturnRequestsController(_assetBorrowAndReturnRequestRepositoryMock.Object, _employeeRepositoryMock.Object, _assetCatalogueRepositoryMock.Object, _adminRepositoryMock.Object, _mapperMock.Object, _loggerMock.Object);

			_fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
	.ForEach(b => _fixture.Behaviors.Remove(b));
			_fixture.Behaviors.Add(new OmitOnRecursionBehavior());
		}

		[Test]
		public void GetAssetBorrowAndReturnRequests_ReturnsOk()
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

			var requests = _fixture.CreateMany<AssetBorrowAndReturnRequestDto>(5).ToList();

			_mapperMock.Setup(m => m.Map<ICollection<AssetBorrowAndReturnRequestDto>>(It.IsAny<AssetAuditReportRequest>)).Returns(requests);

			var result = _controller.GetAssetBorrowAndReturnRequests();
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void GetAssetBorrowAndReturnRequestByID_ReturnsOk()
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

			var request = _fixture.Create<AssetBorrowAndReturnRequestDto>();

			_assetBorrowAndReturnRequestRepositoryMock.Setup(a => a.RequestExists(It.IsAny<int>())).Returns(true);

			_mapperMock.Setup(m => m.Map<AssetBorrowAndReturnRequestDto>(It.IsAny<AssetBorrowAndReturnRequest>())).Returns(request);

			var result = _controller.GetAssetBorrowAndReturnRequestByID(1);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void GetAssetBorrowAndReturnRequestByEmployee_ReturnsOk()
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

			var requests = _fixture.CreateMany<AssetBorrowAndReturnRequestDto>(5).ToList();

			_employeeRepositoryMock.Setup(a => a.EmployeeExists(It.IsAny<int>())).Returns(true);

			_mapperMock.Setup(m => m.Map<ICollection<AssetBorrowAndReturnRequestDto>>(It.IsAny<AssetBorrowAndReturnRequest>())).Returns(requests);

			var result = _controller.GetAssetBorrowAndReturnRequestByEmployee(1);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void CreateAssetBorrowAndReturnRequest_ReturnsOk()
		{
			var employee = _fixture.Create<Employee>();

			var adminClaims = new List<Claim>
			{
				new Claim("id", employee.ID.ToString()),
				new Claim(ClaimTypes.Role, "Employee")
			};

			var identity = new ClaimsIdentity(adminClaims, "TestAuthType");
			var principal = new ClaimsPrincipal(identity);

			_controller.ControllerContext = new ControllerContext
			{
				HttpContext = new DefaultHttpContext { User = principal }
			};

			var request = _fixture.Create<AssetBorrowAndReturnRequest>();
			var mappedRequest = _fixture.Create<AssetBorrowAndReturnRequestDto>();
			mappedRequest.EmployeeID = employee.ID;

			mappedRequest.AssetAllocationFrom = DateTime.Now;
			mappedRequest.AssetAllocationTill = DateTime.Now.AddDays(1);
			mappedRequest.AssetRequestType = "Borrow";
			
			_adminRepositoryMock.Setup(a => a.AdminExists(It.IsAny<int>())).Returns(true);

			_assetCatalogueRepositoryMock.Setup(a => a.AssetExists(It.IsAny<int>())).Returns(true);

			_mapperMock.Setup(m => m.Map<AssetBorrowAndReturnRequest>(It.IsAny<AssetBorrowAndReturnRequestDto>)).Returns(request);

			_assetBorrowAndReturnRequestRepositoryMock.Setup(r => r.CreateRequest(It.IsAny<AssetBorrowAndReturnRequest>())).Returns(true);

			var result = _controller.CreateAssetBorrowAndReturnRequest(mappedRequest);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void UpdateAssetBorrowAndReturnRequest_ReturnsOk()
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

			var request = _fixture.Create<AssetBorrowAndReturnRequest>();
			var mappedRequest = _fixture.Create<AssetBorrowAndReturnRequestDto>();
			mappedRequest.EmployeeID = admin.ID;

			mappedRequest.AssetAllocationFrom = DateTime.Now;
			mappedRequest.AssetAllocationTill = DateTime.Now.AddDays(1);
			mappedRequest.AssetRequestType = "Borrow";

			_assetBorrowAndReturnRequestRepositoryMock.Setup(x => x.RequestExists(It.IsAny<int>())).Returns(true);

			_employeeRepositoryMock.Setup(e => e.EmployeeExists(It.IsAny<int>())).Returns(true);

			_adminRepositoryMock.Setup(a => a.AdminExists(It.IsAny<int>())).Returns(true);

			_assetCatalogueRepositoryMock.Setup(a => a.AssetExists(It.IsAny<int>())).Returns(true);

			_mapperMock.Setup(m => m.Map<AssetBorrowAndReturnRequest>(It.IsAny<AssetBorrowAndReturnRequestDto>)).Returns(request);

			_assetBorrowAndReturnRequestRepositoryMock.Setup(r => r.UpdateRequest(It.IsAny<AssetBorrowAndReturnRequest>())).Returns(true);

			var result = _controller.UpdateAssetBorrowAndReturnRequest(mappedRequest.RequestID, mappedRequest);
			var obj = result as NoContentResult;

			Assert.AreEqual(204, obj.StatusCode);
		}
	}
}
