using AssetManagementSystem.Models;

namespace AssetManagementSystem.Interfaces
{
    public interface IAssetCatalogueRepository
    {
        public ICollection<Asset> GetAllAssets();
        public Asset? GetAssetById(int assetID);
        public ICollection<Asset> GetAssetsByCategory(int categoryID);
        public ICollection<Asset> GetAssetsForSearch(string searchQuery);
        public bool CreateAsset(Asset assetCatalogue);
        public bool UpdateAsset(Asset assetCatalogue);
        public bool DeleteAsset(Asset asset);
        public bool AssetExists(int assetID);
        public bool Save();
    }
}
