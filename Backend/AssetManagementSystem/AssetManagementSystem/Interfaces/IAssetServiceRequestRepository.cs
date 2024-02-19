using AssetManagementSystem.Models;

namespace AssetManagementSystem.Interfaces
{
    public interface IAssetServiceRequestRepository
    {
        public ICollection<AssetServiceRequest> GetAllServiceRequests();
        public AssetServiceRequest GetServiceRequestByID(int requestID);
        public ICollection<AssetServiceRequest> GetServiceRequestsByEmployee(int employeeID);
        public bool CreateServiceRequest(AssetServiceRequest assetServiceRequest);
        public bool UpdateServiceRequest(AssetServiceRequest assetServiceRequest);
        public bool ServiceRequestExists(int requestID);
        public bool Save();
    }
}
