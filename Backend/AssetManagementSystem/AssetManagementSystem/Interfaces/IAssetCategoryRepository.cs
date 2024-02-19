using AssetManagementSystem.Models;

namespace AssetManagementSystem.Interfaces
{
    public interface IAssetCategoryRepository
    {
        public ICollection<AssetCategory> GetAllCategories();
        public AssetCategory? GetCategoryByID(int categoryID);
        public bool CreateCategory(AssetCategory category);
        public bool UpdateCategory(AssetCategory category);
        public bool DeleteCategory(AssetCategory category);
        public bool AssetCategoryExists(int categoryID);
        public bool Save();
    }
}
