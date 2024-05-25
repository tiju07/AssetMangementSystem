using AssetManagementSystem.Dto;
using AssetManagementSystem.Models;
using Microsoft.AspNetCore.Mvc;

namespace AssetManagementSystem.Interfaces
{
    public interface IAdminRepository
    {
        public ICollection<Admin> GetAdminsWithPendingAccess();
        public Admin? GetAdminByID(int id);
        public Admin GetAdminByUsername(string username);
        public bool UpdateAdmin(Admin admin);
        public bool CreateAdmin(Admin admin);
        public bool DeleteAdmin(int id);
        public bool AdminExists(int? id);
        public bool AdminExists(AdminDto admin);
        public bool AdminExists(string email);
        public bool Save();
    }
}
