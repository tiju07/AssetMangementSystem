using AssetManagementSystem.Controllers.v1;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using AutoFixture;
using AutoMapper;
using Castle.Core.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Controller;
using Moq;
using System.Security.Claims;
using System.Security.Principal;

namespace AssetManagementSystemTestProject
{
    [TestFixture]
	public class AdminsControllerTests
	{

		private Mock<IAdminRepository> _adminRepository;
		private Mock<IMapper> _mapper;
		private Fixture _fixture;
		private AdminsController _controller;
		private Mock<ILogger<AdminsController>> _logger;

		[SetUp]
		public void Setup()
		{
			_fixture = new Fixture();
			_adminRepository = new Mock<IAdminRepository>();
			_mapper = new Mock<IMapper>();
			_logger = new Mock<ILogger<AdminsController>>();
			_controller = new AdminsController(_adminRepository.Object, _mapper.Object, _logger.Object);
		}

		[Test]
		public void GetAdminByID_ReturnsOk()
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


			_adminRepository.Setup(repo => repo.AdminExists(It.IsAny<int>())).Returns(true);

			_adminRepository.Setup(repo => repo.GetAdminByID(It.IsAny<int>())).Returns(admin);

			//Act
			var result = _controller.GetAdminByID(admin.ID);
			var obj = result as OkResult;

			//Assert
			Assert.AreEqual(200, obj.StatusCode);
		}

		[Test]
		public void GetAdminByID_ReturnsUnauthorized()
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

			var result = _controller.GetAdminByID(1);
			var obj = result as UnauthorizedResult;
			
			Assert.AreEqual(401, obj.StatusCode);
		}

		[Test]
		public void UpdateAdmin_ReturnsOk()
		{
			var admin = _fixture.Create<Admin>();
			var mappedAdmin = _fixture.Create<AdminDto>();
			mappedAdmin.ID = admin.ID;

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

			_mapper.Setup<Admin>(m => m.Map<Admin>(It.IsAny<AdminDto>())).Returns(admin);

			_adminRepository.Setup<Admin>(a => a.GetAdminByID(It.IsAny<int>())).Returns(admin);

			_adminRepository.Setup(a => a.AdminExists(It.IsAny<AdminDto>())).Returns(false);

			_adminRepository.Setup(a => a.UpdateAdmin(It.IsAny<Admin>())).Returns(true);

			var result = _controller.UpdateAdmin(admin.ID, mappedAdmin);
			var obj = result as NoContentResult;

			Assert.AreEqual(204, obj.StatusCode);
		}

		[Test]
		public void DeleteAdmin_ReturnsOk()
		{
			var admin = _fixture.Create<Admin>();
			var mappedAdmin = _fixture.Create<AdminDto>();
			mappedAdmin.ID = admin.ID;

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

			_adminRepository.Setup(a => a.AdminExists(It.IsAny<int>())).Returns(true);

			_adminRepository.Setup(a => a.DeleteAdmin(It.IsAny<int>())).Returns(true);

			var result = _controller.DeleteAdmin(admin.ID);
			var obj = result as NoContentResult;

			Assert.AreEqual(204, obj.StatusCode);
		}
	}
}