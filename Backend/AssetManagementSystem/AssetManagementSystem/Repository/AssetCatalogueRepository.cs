using AssetManagementSystem.Data;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AssetManagementSystem.Repository
{
    public class AssetCatalogueRepository : IAssetCatalogueRepository
    {
        private readonly AssetManagementSystemContext _context;

        public AssetCatalogueRepository(AssetManagementSystemContext context)
        {
            _context = context;
        }

        public async Task<bool> AssetExists(int assetID)
        {
            return await _context.AssetCatalogue.AnyAsync(a => a.AssetID == assetID);
        }

        public async Task<bool> CreateAsset(Asset assetCatalogue)
        {
            await _context.AssetCatalogue.AddAsync(assetCatalogue);
            return await Save();
        }

        public async Task<bool> DeleteAsset(Asset asset)
        {
            _context.AssetCatalogue.Remove(asset);
            return await Save();
        }

        public async Task<ICollection<Asset>> GetAllAssets()
        {
            return await _context.AssetCatalogue.ToListAsync();
        }

        public async Task<Asset?> GetAssetById(int assetID)
        {
            return await _context.AssetCatalogue.FindAsync(assetID);
        }

        public async Task<bool> UpdateAsset(Asset assetCatalogue)
        {
            _context.AssetCatalogue.Update(assetCatalogue);
            return await Save();
        }

        public async Task<bool> Save()
        {
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

		public async Task<ICollection<Asset>> GetAssetsByCategory(int categoryID)
		{

		    return await _context.AssetCatalogue.Where(a => a.AssetCategoryID == categoryID).ToListAsync();
		}

		public async Task<ICollection<Asset>> GetAssetsForSearch(string searchQuery)
		{
			searchQuery = searchQuery.ToLower();
			return await _context.AssetCatalogue.Where(a => a.AssetModel.ToLower().Contains(searchQuery) || 
                                                 a.AssetDescription.ToLower().Contains(searchQuery) ||
                                                 a.AssetName.ToLower().Contains(searchQuery) || 
                                                 a.AssetSpecifications.ToLower().Contains(searchQuery)
                                                ).ToListAsync();
		}

	}
}
