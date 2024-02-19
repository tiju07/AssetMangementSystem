using AssetManagementSystem.Dto;
using AssetManagementSystem.Models;
using NuGet.ContentModel;

namespace AssetManagementSystem.Interfaces
{
    public interface IAssetAllocationRepository
    {
        public ICollection<AssetAllocationDetail> GetAllAssetAllocations();
        public AssetAllocationDetail GetAssetAllocationByID(int assetAllocationID);
        public ICollection<AssetAllocationDetail> GetAssetAllocationsByEmployee(int employeeID);

        public bool AllocateAsset(AssetAllocationDetail assetAllocationDetail);
        public bool UpdateAllocationDetails(AssetAllocationDetail assetAllocationDetail);
        public bool DeallocateAsset(int assetAllocationID);
        public bool AllocationDetailExists(int assetAllocationID);
        public bool AllocationDetailExists(int assetID, int employeeID);
        public bool Save();
    }
}
