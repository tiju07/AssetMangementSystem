using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AssetManagementSystem.Models;
using AssetManagementSystem.Interfaces;
using AutoMapper;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Utils;
using Microsoft.AspNetCore.Authorization;
using Asp.Versioning;
using Microsoft.AspNetCore.Cors;

namespace AssetManagementSystem.Controllers.v1
{
	[ApiVersion("1.0")]
	[Route("api/v{version:apiversion}/Assets")]
    [ApiController]
	[EnableCors]
	public class AssetCataloguesController : ControllerBase
    {
        private readonly IAssetCatalogueRepository _assetCatalogueRepository;
        private readonly IAssetCategoryRepository _assetCategoryRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<AssetCataloguesController> _logger;

        public AssetCataloguesController(IAssetCatalogueRepository assetCatalogueRepository, IAssetCategoryRepository assetCategoryRepository, IMapper mapper, ILogger<AssetCataloguesController> logger)
        {
            _assetCatalogueRepository = assetCatalogueRepository;
            _assetCategoryRepository = assetCategoryRepository;
            _mapper = mapper;
            _logger = logger;
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin, Employee")]
        [HttpGet]
        public IActionResult GetAllAssetDetails([FromQuery] string? searchQuery, [FromQuery] int? categoryFilter)
        {
            try
            {
                if (searchQuery != null) searchQuery = searchQuery.ToLower();
                ICollection<AssetDto> assetCatalogue = new List<AssetDto>();
                if (searchQuery == null && categoryFilter == null)
                {
                    assetCatalogue = _mapper.Map<ICollection<AssetDto>>(_assetCatalogueRepository.GetAllAssets());
                }
                else if (searchQuery != null && categoryFilter == null)
                {
                    assetCatalogue = _mapper.Map<ICollection<AssetDto>>(_assetCatalogueRepository.GetAssetsForSearch(searchQuery));
                }
                else if (categoryFilter != null && searchQuery == null)
                {
                    var category = _assetCategoryRepository.GetCategoryByID((int)categoryFilter);
                    if (category != null)
                    {
                        assetCatalogue = _mapper.Map<ICollection<AssetDto>>(_assetCatalogueRepository.GetAssetsByCategory(category.CategoryID));
                    }
                }
                else
                {
                    var category = _assetCategoryRepository.GetCategoryByID((int)categoryFilter);
                    if (category != null)
                    {
                        assetCatalogue = _mapper.Map<ICollection<AssetDto>>(_assetCatalogueRepository.GetAssetsByCategory(category.CategoryID));
                        assetCatalogue = _mapper.Map<ICollection<AssetDto>>(assetCatalogue
                            .Where(a => a.AssetModel.ToLower().Contains(searchQuery) ||
                            a.AssetDescription.ToLower().Contains(searchQuery) ||
                            a.AssetName.ToLower().Contains(searchQuery) ||
                            a.AssetSpecifications.ToLower().Contains(searchQuery)
                            ).ToList());
                    }
                }

                return Ok(assetCatalogue);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin, Employee")]
        [HttpGet("{assetID}")]
        public IActionResult GetAssetDetailsByID(int assetID)
        {
            try
            {
                if (!_assetCatalogueRepository.AssetExists(assetID)) return NotFound();

                var asset = _mapper.Map<AssetDto>(_assetCatalogueRepository.GetAssetById(assetID));
                return Ok(asset);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin")]
        [HttpPut("{assetID}")]
        public IActionResult UpdateAssetDetails(int assetID, AssetDto asset)
        {
            try
            {
                if (assetID != asset.AssetID) return BadRequest();

                if (!_assetCatalogueRepository.AssetExists(assetID)) return NotFound();

                if (!AssetCatalogueUtils.AssetStatusIsValid(asset.AssetStatus)) return BadRequest("Invalid asset status!");

                if (!(asset.AssetValue > 0)) return BadRequest("Invalid asset value!");

                var assetToUpdate = _mapper.Map<Asset>(asset);
                var result = _assetCatalogueRepository.UpdateAsset(assetToUpdate);

                if (result) return NoContent();

                ModelState.AddModelError("Error", "An error occured updating the asset details!");
                return StatusCode(500, ModelState);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult CreateAsset(AssetDto asset)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                if (!_assetCategoryRepository.AssetCategoryExists(asset.AssetCategoryID)) return BadRequest("Invalid category ID!");

                if (!AssetCatalogueUtils.AssetStatusIsValid(asset.AssetStatus)) return BadRequest("Invalid asset status!");

                if (!(asset.AssetValue > 0)) return BadRequest("Invalid asset value!");

                var assetToCreate = _mapper.Map<Asset>(asset);
                var result = _assetCatalogueRepository.CreateAsset(assetToCreate);

                if (result) return Ok(assetToCreate);

                ModelState.AddModelError("Error", "An error occured while creating the asset!");
                return StatusCode(500, ModelState);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }

		[MapToApiVersion("1.0")]
		[Authorize(Roles = "Admin")]
        [HttpDelete("{assetID}")]
        public IActionResult DeleteAsset(int assetID)
        {
            try
            {
                if (!_assetCatalogueRepository.AssetExists(assetID)) return NotFound();

                var assetToDelete = _assetCatalogueRepository.GetAssetById(assetID);

                var result = _assetCatalogueRepository.DeleteAsset(assetToDelete);
                if (result) return NoContent();

                ModelState.AddModelError("Error", "An error occured while deleting the asset!");
                return StatusCode(500, ModelState);
            }
            catch (Exception ex)
            {
                _logger.LogCritical($"Exception error: {ex.Message}");
                return StatusCode(500, "An error occured at the server!");
            }
        }
    }
}
