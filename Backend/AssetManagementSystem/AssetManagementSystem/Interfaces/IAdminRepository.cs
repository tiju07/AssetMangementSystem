using AssetManagementSystem.Dto;
using AssetManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagementSystem.Interfaces
{
    public interface IAdminRepository
    {
        public Task<ICollection<Admin>> GetAdminsWithPendingAccess();
        public Task<Admin?> GetAdminByID(int id);
        public Task<Admin> GetAdminByUsername(string username);
        public Task<bool> UpdateAdmin(Admin admin);
        public Task<bool> CreateAdmin(Admin admin);
        public Task<bool> DeleteAdmin(int id);
        public Task<bool> AdminExists(int? id);
        public Task<bool> AdminExists(AdminDto admin);
        public Task<bool> AdminExists(string email);
        public Task<bool> Save();
    }
}
