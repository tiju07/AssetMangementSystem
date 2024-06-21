using AssetManagementSystem.Models;

namespace AssetManagementSystem.Interfaces
{
    public interface IAssetCategoryRepository
    {
        public Task<ICollection<AssetCategory>> GetAllCategories();
        public Task<AssetCategory?> GetCategoryByID(int categoryID);
        public Task<bool> CreateCategory(AssetCategory category);
        public Task<bool> UpdateCategory(AssetCategory category);
        public Task<bool> DeleteCategory(AssetCategory category);
        public Task<bool> AssetCategoryExists(int categoryID);
        public Task<bool> Save();
    }
}
