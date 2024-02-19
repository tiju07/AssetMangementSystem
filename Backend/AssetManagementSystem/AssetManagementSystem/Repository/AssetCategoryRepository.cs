using AssetManagementSystem.Data;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;

namespace AssetManagementSystem.Repository
{
    public class AssetCategoryRepository : IAssetCategoryRepository
    {
        private readonly AssetManagementSystemContext _context;

        public AssetCategoryRepository(AssetManagementSystemContext context)
        {
            _context = context;
        }
        public bool AssetCategoryExists(int categoryID)
        {
            return _context.AssetCategories.Any(c => c.CategoryID == categoryID);
        }

        public bool CreateCategory(AssetCategory category)
        {
            _context.AssetCategories.Add(category);
            return Save();
        }

        public bool DeleteCategory(AssetCategory category)
        {
            _context.AssetCategories.Remove(category);
            return Save();
        }

        public ICollection<AssetCategory> GetAllCategories()
        {
            return _context.AssetCategories.ToList();
        }

        public AssetCategory? GetCategoryByID(int categoryID)
        {
            return _context.AssetCategories.Find(categoryID);
        }

        public bool Save()
        {
            var result = _context.SaveChanges();
            return result > 0;
        }

        public bool UpdateCategory(AssetCategory category)
        {
            _context.AssetCategories.Update(category);
            return Save();
        }
    }
}
