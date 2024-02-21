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
    internal class AssetCataloguesControllerTests
	{
		private Mock<IAssetCatalogueRepository> _assetCatalogueRepositoryMock;
		private Mock<IAssetCategoryRepository> _assetCategoryRepositoryMock;
		private Mock<IMapper> _mapperMock;
		private Fixture _fixture;
		private AssetCataloguesController _controller;
		private Mock<ILogger<AssetCataloguesController>> _loggerMock;

		[SetUp]
		public void SetUp()
		{
			_fixture = new Fixture();
			_assetCatalogueRepositoryMock = new Mock<IAssetCatalogueRepository>();
			_assetCategoryRepositoryMock = new Mock<IAssetCategoryRepository>();
			_mapperMock = new Mock<IMapper>();
			_loggerMock = new Mock<ILogger<AssetCataloguesController>>();

			_controller = new AssetCataloguesController(_assetCatalogueRepositoryMock.Object, _assetCategoryRepositoryMock.Object, _mapperMock.Object, _loggerMock.Object);

			_fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
	.ForEach(b => _fixture.Behaviors.Remove(b));
			_fixture.Behaviors.Add(new OmitOnRecursionBehavior());
		}

		[Test]
		public void GetAllAssetDetails_ReturnsOk()
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

			var assets = _fixture.CreateMany<AssetDto>(5).ToList();

			_mapperMock.Setup(m => m.Map<ICollection<AssetDto>>(It.IsAny<Asset>)).Returns(assets);

			var result = _controller.GetAllAssetDetails(null, null);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void GetAssetDetailsByID_ReturnsOk()
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

			var asset = _fixture.Create<AssetDto>();

			_assetCatalogueRepositoryMock.Setup(a => a.AssetExists(It.IsAny<int>())).Returns(true);

			_mapperMock.Setup(m => m.Map<AssetDto>(It.IsAny<Asset>)).Returns(asset);

			var result = _controller.GetAssetDetailsByID(1);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void CreateAssetDetails_ReturnsOk()
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

			var asset = _fixture.Create<AssetDto>();
			asset.AssetStatus = "Available";

			_assetCategoryRepositoryMock.Setup(a => a.AssetCategoryExists(It.IsAny<int>())).Returns(true);

			_assetCatalogueRepositoryMock.Setup(a => a.CreateAsset(It.IsAny<Asset>())).Returns(true);

			var result = _controller.CreateAsset(asset);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void UpdateAssetDetails_ReturnsOk()
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

			var asset = _fixture.Create<AssetDto>();
			asset.AssetStatus = "Available";

			_assetCatalogueRepositoryMock.Setup(a => a.AssetExists(It.IsAny<int>())).Returns(true);

			_assetCatalogueRepositoryMock.Setup(a => a.UpdateAsset(It.IsAny<Asset>())).Returns(true);

			var result = _controller.UpdateAssetDetails(asset.AssetID, asset);
			var obj = result as NoContentResult;

			Assert.AreEqual(204, obj.StatusCode);
		}
	}
}
