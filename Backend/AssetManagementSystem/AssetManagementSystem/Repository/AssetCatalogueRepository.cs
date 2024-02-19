using AssetManagementSystem.Data;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using AutoMapper;

namespace AssetManagementSystem.Repository
{
    public class AssetCatalogueRepository : IAssetCatalogueRepository
    {
        private readonly AssetManagementSystemContext _context;

        public AssetCatalogueRepository(AssetManagementSystemContext context)
        {
            _context = context;
        }

        public bool AssetExists(int assetID)
        {
            return _context.AssetCatalogue.Any(a => a.AssetID == assetID);
        }

        public bool CreateAsset(Asset assetCatalogue)
        {
            _context.AssetCatalogue.Add(assetCatalogue);
            return Save();
        }

        public bool DeleteAsset(Asset asset)
        {
            _context.AssetCatalogue.Remove(asset);
            return Save();
        }

        public ICollection<Asset> GetAllAssets()
        {
            return _context.AssetCatalogue.ToList();
        }

        public Asset? GetAssetById(int assetID)
        {
            return _context.AssetCatalogue.Find(assetID);
        }

        public bool UpdateAsset(Asset assetCatalogue)
        {
            _context.AssetCatalogue.Update(assetCatalogue);
            return Save();
        }

        public bool Save()
        {
            var result = _context.SaveChanges();
            return result > 0;
        }

		public ICollection<Asset> GetAssetsByCategory(int categoryID)
		{

		    return _context.AssetCatalogue.Where(a => a.AssetCategoryID == categoryID).ToList();
		}

		public ICollection<Asset> GetAssetsForSearch(string searchQuery)
		{
			searchQuery = searchQuery.ToLower();
			return _context.AssetCatalogue.Where(a => a.AssetModel.ToLower().Contains(searchQuery) || 
                                                 a.AssetDescription.ToLower().Contains(searchQuery) ||
                                                 a.AssetName.ToLower().Contains(searchQuery) || 
                                                 a.AssetSpecifications.ToLower().Contains(searchQuery)
                                                ).ToList();
		}

	}
}
