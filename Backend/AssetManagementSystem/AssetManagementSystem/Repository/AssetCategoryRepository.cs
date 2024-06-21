using AssetManagementSystem.Data;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace AssetManagementSystem.Repository
{
    public class AssetCategoryRepository : IAssetCategoryRepository
    {
        private readonly AssetManagementSystemContext _context;

        public AssetCategoryRepository(AssetManagementSystemContext context)
        {
            _context = context;
        }
        public async Task<bool> AssetCategoryExists(int categoryID)
        {
            return await _context.AssetCategories.AnyAsync(c => c.CategoryID == categoryID);
        }

        public async Task<bool> CreateCategory(AssetCategory category)
        {
            _context.AssetCategories.Add(category);
            return await Save();
        }

        public async Task<bool> DeleteCategory(AssetCategory category)
        {
            _context.AssetCategories.Remove(category);
            return await Save();
        }

        public async Task<ICollection<AssetCategory>> GetAllCategories()
        {
            return await _context.AssetCategories.ToListAsync();
        }

        public async Task<AssetCategory?> GetCategoryByID(int categoryID)
        {
            return await _context.AssetCategories.FindAsync(categoryID);
        }

        public async Task<bool> Save()
        {
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> UpdateCategory(AssetCategory category)
        {
            _context.AssetCategories.Update(category);
            return await Save();
        }
    }
}
