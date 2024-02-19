using AssetManagementSystem.Data;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;

namespace AssetManagementSystem.Repository
{
    public class AssetBorrowAndReturnRequestRepository : IAssetBorrowAndReturnRequestRepository
    {
        private readonly AssetManagementSystemContext _context;

        public AssetBorrowAndReturnRequestRepository(AssetManagementSystemContext context)
        {
            _context = context;
        }
        public bool CreateRequest(AssetBorrowAndReturnRequest request)
        {
            _context.AssetBorrowAndReturnRequests.Add(request);
            return Save();
        }

        public ICollection<AssetBorrowAndReturnRequest> GetAllRequests()
        {
            return _context.AssetBorrowAndReturnRequests.ToList();
        }

        public AssetBorrowAndReturnRequest GetRequestById(int requestID)
        {
            return _context.AssetBorrowAndReturnRequests.Find(requestID);
        }

        public bool RequestExists(int requestID)
        {
            return _context.AssetBorrowAndReturnRequests.Any(a => a.RequestID == requestID);
        }

        public bool Save()
        {
            var result = _context.SaveChanges();
            return result > 0;
        }

        public bool UpdateRequest(AssetBorrowAndReturnRequest request)
        {
            _context.AssetBorrowAndReturnRequests.Update(request);
            return Save();
        }

        public ICollection<AssetBorrowAndReturnRequest> GetRequestByEmployee(int employeeID)
        {
            return _context.AssetBorrowAndReturnRequests.Where(r => r.EmployeeID == employeeID).ToList();
        }
    }
}
