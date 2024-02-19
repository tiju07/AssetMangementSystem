using AssetManagementSystem.Models;

namespace AssetManagementSystem.Interfaces
{
    public interface IAssetBorrowAndReturnRequestRepository
    {
        public ICollection<AssetBorrowAndReturnRequest> GetAllRequests();
        public AssetBorrowAndReturnRequest GetRequestById(int id);
        public ICollection<AssetBorrowAndReturnRequest> GetRequestByEmployee(int employeeID);
        public bool CreateRequest(AssetBorrowAndReturnRequest request);
        public bool UpdateRequest(AssetBorrowAndReturnRequest request);
        public bool RequestExists(int requestID);
        public bool Save();
    }
}
