using AssetManagementSystem.Data;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using AutoMapper;
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
        public bool AllocateAsset(AssetAllocationDetail assetAllocationDetail)
        {
            _context.AssetAllocationDetails.Add(assetAllocationDetail);
            return Save();
        }

        public bool DeallocateAsset(int assetAllocationID)
        {
            var assetToDeallocate = _context.AssetAllocationDetails.FirstOrDefault(a => a.AssetAllocationID == assetAllocationID);
            assetToDeallocate.AllocationStatus = "De-allocated";
            _context.AssetAllocationDetails.Update(assetToDeallocate);

            return Save();
        }

        public ICollection<AssetAllocationDetail> GetAssetAllocationsByEmployee(int empoloyeeID)
        {
            return _context.AssetAllocationDetails.Where(a => a.EmployeeID == empoloyeeID).ToList();
        }
        public bool Save()
        {
            var result = _context.SaveChanges();
            return result > 0;
        }

        public ICollection<AssetAllocationDetail> GetAllAssetAllocations()
        {
            return _context.AssetAllocationDetails.ToList();
        }

        public bool AllocationDetailExists(int assetAllocationID)
        {
            return _context.AssetAllocationDetails.Any(a => a.AssetAllocationID == assetAllocationID);
        }

        public AssetAllocationDetail GetAssetAllocationByID(int assetAllocationID)
        {
            return _context.AssetAllocationDetails.Find(assetAllocationID);
        }

        public bool UpdateAllocationDetails(AssetAllocationDetail assetAllocationDetail)
        {
            _context.Update(assetAllocationDetail);
            return Save();
        }

        public bool AllocationDetailExists(int assetID, int employeeID)
        {
            return _context.AssetAllocationDetails.Any(a => a.AssetID == assetID && a.EmployeeID == employeeID && a.AllocationStatus == "Allocated");
        }
    }
}
