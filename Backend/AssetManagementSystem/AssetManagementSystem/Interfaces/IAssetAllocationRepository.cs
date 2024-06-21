using AssetManagementSystem.Dto;
using AssetManagementSystem.Models;
using NuGet.ContentModel;

namespace AssetManagementSystem.Interfaces
{
    public interface IAssetAllocationRepository
    {
        public Task<ICollection<AssetAllocationDetail>> GetAllAssetAllocations();
        public Task<AssetAllocationDetail> GetAssetAllocationByID(int assetAllocationID);
        public Task<ICollection<AssetAllocationDetail>> GetAssetAllocationsByEmployee(int employeeID);

        public Task<bool> AllocateAsset(AssetAllocationDetail assetAllocationDetail);
        public Task<bool> UpdateAllocationDetails(AssetAllocationDetail assetAllocationDetail);
        public Task<bool> DeallocateAsset(int assetAllocationID);
        public Task<bool> AllocationDetailExists(int assetAllocationID);
        public Task<bool> AllocationDetailExists(int assetID, int employeeID);
        public Task<bool> Save();
    }
}
