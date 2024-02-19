using AssetManagementSystem.Data;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;

namespace AssetManagementSystem.Repository
{
    public class AssetServiceRequestRepository : IAssetServiceRequestRepository
    {
        private readonly AssetManagementSystemContext _context;

        public AssetServiceRequestRepository(AssetManagementSystemContext context)
        {
            _context = context;
        }
        public bool CreateServiceRequest(AssetServiceRequest assetServiceRequest)
        {
            _context.AssetServiceRequests.Add(assetServiceRequest);
            return Save();
        }

        public ICollection<AssetServiceRequest> GetAllServiceRequests()
        {
            return _context.AssetServiceRequests.ToList();
        }

        public AssetServiceRequest GetServiceRequestByID(int requestID)
        {
            return _context.AssetServiceRequests.Find(requestID);
        }

        public bool Save()
        {
            var result = _context.SaveChanges();
            return result > 0;
        }

        public bool ServiceRequestExists(int requestID)
        {
            return _context.AssetServiceRequests.Any(r => r.RequestID == requestID);
        }

        public bool UpdateServiceRequest(AssetServiceRequest assetServiceRequest)
        {
            _context.AssetServiceRequests.Update(assetServiceRequest);
            return Save();
        }

        public ICollection<AssetServiceRequest> GetServiceRequestsByEmployee(int employeeID)
        {
            return _context.AssetServiceRequests.Where(r => r.EmployeeID == employeeID).ToList();
        }
    }
}
