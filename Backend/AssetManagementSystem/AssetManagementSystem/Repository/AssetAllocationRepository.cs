using AssetManagementSystem.Data;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NuGet.ContentModel;

namespace AssetManagementSystem.Repository
{
    public class AssetAllocationRepository : IAssetAllocationRepository
    {
        private readonly AssetManagementSystemContext _context;
        private readonly IMapper _mapper;

        public AssetAllocationRepository(AssetManagementSystemContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<bool> AllocateAsset(AssetAllocationDetail assetAllocationDetail)
        {
            _context.AssetAllocationDetails.Add(assetAllocationDetail);
            return await Save();
        }

        public async Task<bool> DeallocateAsset(int assetAllocationID)
        {
            var assetToDeallocate = await _context.AssetAllocationDetails.FirstOrDefaultAsync(a => a.AssetAllocationID == assetAllocationID);
            assetToDeallocate.AllocationStatus = "De-allocated";
            _context.AssetAllocationDetails.Update(assetToDeallocate);

            return await Save();
        }

        public async Task<ICollection<AssetAllocationDetail>> GetAssetAllocationsByEmployee(int empoloyeeID)
        {
            return await _context.AssetAllocationDetails.Where(a => a.EmployeeID == empoloyeeID).ToListAsync();
        }
        public async Task<bool> Save()
        {
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async  Task<ICollection<AssetAllocationDetail>> GetAllAssetAllocations()
        {
            return await _context.AssetAllocationDetails.ToListAsync();
        }

        public async Task<bool> AllocationDetailExists(int assetAllocationID)
        {
            return await _context.AssetAllocationDetails.AnyAsync(a => a.AssetAllocationID == assetAllocationID);
        }

        public async Task<AssetAllocationDetail> GetAssetAllocationByID(int assetAllocationID)
        {
            return await _context.AssetAllocationDetails.FindAsync(assetAllocationID);
        }

        public async Task<bool> UpdateAllocationDetails(AssetAllocationDetail assetAllocationDetail)
        {
            _context.Update(assetAllocationDetail);
            return await Save();
        }

        public async Task<bool> AllocationDetailExists(int assetID, int employeeID)
        {
            return await _context.AssetAllocationDetails.AnyAsync(a => a.AssetID == assetID && a.EmployeeID == employeeID && a.AllocationStatus == "Allocated");
        }
    }
}
