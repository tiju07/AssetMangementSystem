using AssetManagementSystem.Data;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace AssetManagementSystem.Repository
{
    public class AssetServiceRequestRepository : IAssetServiceRequestRepository
    {
        private readonly AssetManagementSystemContext _context;

        public AssetServiceRequestRepository(AssetManagementSystemContext context)
        {
            _context = context;
        }
        public async Task<bool> CreateServiceRequest(AssetServiceRequest assetServiceRequest)
        {
            await _context.AssetServiceRequests.AddAsync(assetServiceRequest);
            return await Save();
        }

        public async Task<ICollection<AssetServiceRequest>> GetAllServiceRequests()
        {
            return await _context.AssetServiceRequests.ToListAsync();
        }

        public async Task<AssetServiceRequest> GetServiceRequestByID(int requestID)
        {
            return await _context.AssetServiceRequests.FindAsync(requestID);
        }

        public async Task<bool> Save()
        {
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> ServiceRequestExists(int requestID)
        {
            return await _context.AssetServiceRequests.AnyAsync(r => r.RequestID == requestID);
        }

        public async Task<bool> UpdateServiceRequest(AssetServiceRequest assetServiceRequest)
        {
            _context.AssetServiceRequests.Update(assetServiceRequest);
            return await Save();
        }

        public async Task<ICollection<AssetServiceRequest>> GetServiceRequestsByEmployee(int employeeID)
        {
            return await _context.AssetServiceRequests.Where(r => r.EmployeeID == employeeID).ToListAsync();
        }
    }
}
