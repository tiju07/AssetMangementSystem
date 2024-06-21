using AssetManagementSystem.Models;

namespace AssetManagementSystem.Interfaces
{
    public interface IAssetCatalogueRepository
    {
        public Task<ICollection<Asset>> GetAllAssets();
        public Task<Asset?> GetAssetById(int assetID);
        public Task<ICollection<Asset>> GetAssetsByCategory(int categoryID);
        public Task<ICollection<Asset>> GetAssetsForSearch(string searchQuery);
        public Task<bool> CreateAsset(Asset assetCatalogue);
        public Task<bool> UpdateAsset(Asset assetCatalogue);
        public Task<bool> DeleteAsset(Asset asset);
        public Task<bool> AssetExists(int assetID);
        public Task<bool> Save();
    }
}
