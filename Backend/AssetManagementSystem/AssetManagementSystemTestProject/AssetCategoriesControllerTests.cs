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
    internal class AssetCategoriesControllerTests
	{
		private Mock<IAssetCategoryRepository> _assetCategoryRepositoryMock;
		private Mock<IMapper> _mapperMock;
		private Fixture _fixture;
		private AssetCategoriesController _controller;
		private Mock<ILogger<AssetCategoriesController>> _loggerMock;
		[SetUp]
		public async Task SetUp()
		{
			_assetCategoryRepositoryMock = new Mock<IAssetCategoryRepository>();
			_mapperMock = new Mock<IMapper>();
			_fixture = new Fixture();
			_loggerMock = new Mock<ILogger<AssetCategoriesController>>();

			_controller = new AssetCategoriesController(_assetCategoryRepositoryMock.Object, _mapperMock.Object, _loggerMock.Object);

			_fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
	.ForEach(b => _fixture.Behaviors.Remove(b));
			_fixture.Behaviors.Add(new OmitOnRecursionBehavior());
		}

		[Test]
		public async Task GetAllAssetCategories_ReturnsOk()
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

			var assetCategories = _fixture.CreateMany<AssetCategoryDto>(5).ToList();

			_mapperMock.Setup(m => m.Map<ICollection<AssetCategoryDto>>(It.IsAny<Asset>)).Returns(assetCategories);

			var result = await _controller.GetAllAssetCategories();
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public async Task GetAssetCategorByID_ReturnsOk()
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

			var assetCategory = _fixture.Create<AssetCategoryDto>();

			_assetCategoryRepositoryMock.Setup(a => a.AssetCategoryExists(It.IsAny<int>())).Returns(Task.FromResult(true));

			_mapperMock.Setup(m => m.Map<AssetCategoryDto>(It.IsAny<AssetCategory>)).Returns(assetCategory);

			var result = await _controller.GetAssetCategorByID(1);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public async Task CreateAssetCategory_ReturnsOk()
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

			var assetCategory = _fixture.Create<AssetCategoryDto>();

			_assetCategoryRepositoryMock.Setup(c => c.CreateCategory(It.IsAny<AssetCategory>())).Returns(Task.FromResult(true));

			var result = await _controller.CreateAssetCategory(assetCategory);
			var obj = result as OkObjectResult;

			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public async Task UpdateAssetCategory_ReturnsOk()
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

			var assetCategory = _fixture.Create<AssetCategoryDto>();

			_assetCategoryRepositoryMock.Setup(c => c.UpdateCategory(It.IsAny<AssetCategory>())).Returns(Task.FromResult(true));

			var result = await _controller.UpdateAssetCategory(assetCategory.CategoryID, assetCategory);
			var obj = result as NoContentResult;

			Assert.AreEqual(204, obj.StatusCode);
		}

		[Test]
		public async Task DeleteAssetCategory_ReturnsOk()
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

			var assetCategory = _fixture.Create<AssetCategory>();

			_assetCategoryRepositoryMock.Setup(c => c.AssetCategoryExists(It.IsAny<int>())).Returns(Task.FromResult(true));

			_assetCategoryRepositoryMock.Setup(c => c.GetCategoryByID(It.IsAny<int>())).Returns(Task.FromResult(assetCategory));

			_assetCategoryRepositoryMock.Setup(c => c.DeleteCategory(It.IsAny<AssetCategory>())).Returns(Task.FromResult(true));

			var result = await _controller.DeleteAssetCategory(1);
			var obj = result as NoContentResult;

			Assert.AreEqual(204, obj.StatusCode);
		}
	}
}
