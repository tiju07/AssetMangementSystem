using AssetManagementSystem.Models;

namespace AssetManagementSystem.Interfaces
{
    public interface IAssetBorrowAndReturnRequestRepository
    {
        public Task<ICollection<AssetBorrowAndReturnRequest>> GetAllRequests();
        public Task<AssetBorrowAndReturnRequest> GetRequestById(int id);
        public Task<ICollection<AssetBorrowAndReturnRequest>> GetRequestByEmployee(int employeeID);
        public Task<bool> CreateRequest(AssetBorrowAndReturnRequest request);
        public Task<bool> UpdateRequest(AssetBorrowAndReturnRequest request);
        public Task<bool> RequestExists(int requestID);
        public Task<bool> Save();
    }
}
