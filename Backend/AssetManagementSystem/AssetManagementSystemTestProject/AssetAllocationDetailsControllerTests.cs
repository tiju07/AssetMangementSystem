﻿using AssetManagementSystem.Controllers.v1;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using AssetManagementSystem.Utils;
using AutoFixture;
using AutoMapper;
using Castle.Core.Logging;
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
    internal class AssetAllocationDetailsControllerTests
	{
		private AssetAllocationDetailsController _controller;
		private Mock<IAssetAllocationRepository> _assetAllocationRepositoryMock;
		private Mock<IEmployeeRepository> _employeeRepositoryMock;
		private Mock<IAssetCatalogueRepository> _assetCatalogueRepositoryMock;
		private Mock<IMapper> _mapperMock;
		private Fixture _fixture;
		private Mock<AssetAllocationUtils> _utilsMock;
		private Mock<ILogger<AssetAllocationDetailsController>> _loggerMock;
		[SetUp]
		public async Task SetUp()
		{
			_fixture = new Fixture();
			_assetAllocationRepositoryMock = new Mock<IAssetAllocationRepository>();
			_mapperMock = new Mock<IMapper>();
			_employeeRepositoryMock = new Mock<IEmployeeRepository>();
			_assetCatalogueRepositoryMock = new Mock<IAssetCatalogueRepository>();
			_loggerMock = new Mock<ILogger<AssetAllocationDetailsController>>();
			_controller = new AssetAllocationDetailsController(_assetAllocationRepositoryMock.Object, _employeeRepositoryMock.Object, _assetCatalogueRepositoryMock.Object, _mapperMock.Object, _loggerMock.Object);
		}

		[Test]
		public async Task GetAllAssetAllocationDetails_ReturnsOk()
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

			ICollection<AssetAllocationDetailDto> mappedAllocationDetails = _fixture.CreateMany<AssetAllocationDetailDto>(5).ToList();

			_mapperMock.Setup(m => m.Map<ICollection<AssetAllocationDetailDto>>(It.IsAny<ICollection<AssetAllocationDetail>>())).Returns(mappedAllocationDetails);

			var result = await _controller.GetAllAssetAllocationDetails();
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public async Task GetAssetAllocationDetailByID_ReturnsOk()
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

			var details = _fixture.Create<AssetAllocationDetailDto>();

			_assetAllocationRepositoryMock.Setup(a => a.AllocationDetailExists(It.IsAny<int>())).Returns(Task.FromResult(true));

			_mapperMock.Setup(m => m.Map<AssetAllocationDetailDto>(It.IsAny<AssetAllocationDetail>())).Returns(details);

			var result = await _controller.GetAssetAllocationDetailByID(details.EmployeeID);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public async Task GetAssetAllocationDetailsByEmployee_ReturnsOk()
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

			var details = _fixture.CreateMany<AssetAllocationDetailDto>(5).ToList();

			_employeeRepositoryMock.Setup(a => a.EmployeeExists(It.IsAny<int>())).Returns(Task.FromResult(true));

			_mapperMock.Setup(m => m.Map<ICollection<AssetAllocationDetailDto>>(It.IsAny<ICollection<AssetAllocationDetail>>())).Returns(details);

			var result = await _controller.GetAssetAllocationDetailsByEmployee(1);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public async Task CreateAssetAllocationDetail_ReturnsOk()
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
			_fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
	.ForEach(b => _fixture.Behaviors.Remove(b));
			_fixture.Behaviors.Add(new OmitOnRecursionBehavior());

			var detail = _fixture.Create<AssetAllocationDetail>();
			var mappedDetail = _fixture.Create<AssetAllocationDetailDto>();

			detail.AllocationStatus = "Allocated";
			mappedDetail.AllocationStatus = "Allocated";
			_employeeRepositoryMock.Setup(a => a.EmployeeExists(It.IsAny<int>())).Returns(Task.FromResult(true));

			_assetCatalogueRepositoryMock.Setup(a => a.AssetExists(It.IsAny<int>())).Returns(Task.FromResult(true));

			_mapperMock.Setup(m => m.Map<AssetAllocationDetail>(It.IsAny<AssetAllocationDetail>())).Returns(detail);

			_assetAllocationRepositoryMock.Setup(a => a.AllocateAsset(It.IsAny<AssetAllocationDetail>())).Returns(Task.FromResult(true));

			var result = await _controller.CreateAssetAllocationDetail(mappedDetail);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public async Task UpdateAssetAllocationDetail_ReturnsOk()
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
			_fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
	.ForEach(b => _fixture.Behaviors.Remove(b));
			_fixture.Behaviors.Add(new OmitOnRecursionBehavior());

			var detail = _fixture.Create<AssetAllocationDetail>();
			var mappedDetail = _fixture.Create<AssetAllocationDetailDto>();

			detail.AllocationStatus = "Allocated";
			mappedDetail.AllocationStatus = "Allocated";
			mappedDetail.AssetAllocatedFrom = DateTime.Now;
			mappedDetail.AssetAllocatedTill = DateTime.Now;


			_assetAllocationRepositoryMock.Setup(a => a.AllocationDetailExists(It.IsAny<int>())).Returns(Task.FromResult(true));	
			
			_employeeRepositoryMock.Setup(a => a.EmployeeExists(It.IsAny<int>())).Returns(Task.FromResult(true));


			_assetCatalogueRepositoryMock.Setup(a => a.AssetExists(It.IsAny<int>())).Returns(Task.FromResult(true));

			_mapperMock.Setup(m => m.Map<AssetAllocationDetail>(It.IsAny<AssetAllocationDetail>())).Returns(detail);

			_assetAllocationRepositoryMock.Setup(a => a.UpdateAllocationDetails(It.IsAny<AssetAllocationDetail>())).Returns(Task.FromResult(true));

			var result = await _controller.UpdateAssetAllocationDetail(mappedDetail.AssetAllocationID, mappedDetail);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public async Task DeleteAssetAllocationDetail_ReturnsOk()
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

			_assetAllocationRepositoryMock.Setup(a => a.AllocationDetailExists(It.IsAny<int>())).Returns(Task.FromResult(true));

			_assetAllocationRepositoryMock.Setup(a => a.DeallocateAsset(It.IsAny<int>())).Returns(Task.FromResult(true));

			var result = await _controller.DeleteAssetAllocationDetail(1);
			var obj = result as OkResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

	}
}
