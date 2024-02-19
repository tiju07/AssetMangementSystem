using Microsoft.AspNetCore.Mvc;
using AssetManagementSystem.Models;
using AssetManagementSystem.Interfaces;
using AutoMapper;
using AssetManagementSystem.Dto;
using Microsoft.AspNetCore.Authorization;

namespace AssetManagementSystem.Controllers
{
    [Route("api/Categories")]
    [ApiController]
    public class AssetCategoriesController : ControllerBase
    {
        private readonly IAssetCategoryRepository _assetCategoryRepository;
        private readonly IMapper _mapper;

        public AssetCategoriesController(IAssetCategoryRepository assetCategoryRepository, IMapper mapper)
        {
            _assetCategoryRepository = assetCategoryRepository;
            _mapper = mapper;
        }

		[Authorize(Roles = "Admin, Employee")]
		[HttpGet]
        public IActionResult GetAllAssetCategories()
        {
            var categories = _mapper.Map<ICollection<AssetCategoryDto>>(_assetCategoryRepository.GetAllCategories());

            return Ok(categories);
        }

		[Authorize(Roles = "Admin, Employee")]
		[HttpGet("{categoryID}")]
        public IActionResult GetAssetCategorByID(int categoryID)
        {
            if (!_assetCategoryRepository.AssetCategoryExists(categoryID)) return NotFound();

            var category = _mapper.Map<AssetCategoryDto>(_assetCategoryRepository.GetCategoryByID(categoryID));

            return Ok(category);
        }

		[Authorize(Roles = "Admin")]
		[HttpPut("{categoryID}")]
        public IActionResult UpdateAssetCategory(int categoryID, AssetCategoryDto assetCategory)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            if (categoryID != assetCategory.CategoryID) return BadRequest();

            var categoryToUpdate = _mapper.Map<AssetCategory>(assetCategory);

            var result = _assetCategoryRepository.UpdateCategory(categoryToUpdate);

            if(result) return NoContent();

            ModelState.AddModelError("Error", "An error occured while updating the category!");
            return StatusCode(500, ModelState);
        }

		[Authorize(Roles = "Admin")]
		[HttpPost]
        public IActionResult CreateAssetCategory(AssetCategoryDto assetCategory)
        {
            if(!ModelState.IsValid) return BadRequest(assetCategory);

            var categoryToCreate = _mapper.Map<AssetCategory>(assetCategory);

            var result = _assetCategoryRepository.CreateCategory(categoryToCreate);

            if (result) return Ok(categoryToCreate);

            ModelState.AddModelError("Error", "An error occured while updating the category!");
            return StatusCode(500, ModelState);
        }

		[Authorize(Roles = "Admin")]
		[HttpDelete("{categoryID}")]
        public IActionResult DeleteAssetCategory(int categoryID)
        {
            if (!_assetCategoryRepository.AssetCategoryExists(categoryID)) return NotFound();

            var categoryToDelete = _assetCategoryRepository.GetCategoryByID(categoryID);

            var result = _assetCategoryRepository.DeleteCategory(categoryToDelete);

            if (result) return NoContent();

            ModelState.AddModelError("Error", "An error occured while deleting the category!");
            return StatusCode(500, ModelState);
        }
    }
}
