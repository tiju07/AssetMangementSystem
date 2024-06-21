using AssetManagementSystem.Data;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace AssetManagementSystem.Repository
{
    public class AssetBorrowAndReturnRequestRepository : IAssetBorrowAndReturnRequestRepository
    {
        private readonly AssetManagementSystemContext _context;

        public AssetBorrowAndReturnRequestRepository(AssetManagementSystemContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateRequest(AssetBorrowAndReturnRequest request)
        {
            _context.AssetBorrowAndReturnRequests.Add(request);
            return await Save();
        }

        public async Task<ICollection<AssetBorrowAndReturnRequest>> GetAllRequests()
        {
            return _context.AssetBorrowAndReturnRequests.ToList();
        }

        public async Task<AssetBorrowAndReturnRequest> GetRequestById(int requestID)
        {
            return _context.AssetBorrowAndReturnRequests.Find(requestID);
        }

        public async Task<bool> RequestExists(int requestID)
        {
            return _context.AssetBorrowAndReturnRequests.Any(a => a.RequestID == requestID);
        }

        public async Task<bool> Save()
        {
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> UpdateRequest(AssetBorrowAndReturnRequest request)
        {
            _context.AssetBorrowAndReturnRequests.Update(request);
            return await Save();
        }

        public async Task<ICollection<AssetBorrowAndReturnRequest>> GetRequestByEmployee(int employeeID)
        {
            return await _context.AssetBorrowAndReturnRequests.Where(r => r.EmployeeID == employeeID).ToListAsync();
        }
    }
}
