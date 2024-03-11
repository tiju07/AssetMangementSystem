using AssetManagementSystem.Data;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace AssetManagementSystem.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly AssetManagementSystemContext _context;

        public AdminRepository(AssetManagementSystemContext context)
        {
            _context = context;
        }
        public Admin? GetAdminByID(int id)
        {
            return _context.Admins.FirstOrDefault(a => a.ID == id);
        }
        public bool UpdateAdmin(Admin admin)
        {
            _context.Admins.Update(admin);
            return Save();
        }
        public bool CreateAdmin(Admin admin)
        {
            _context.Admins.Add(admin);
            return Save();
        }
        public bool DeleteAdmin(int adminID)
        {
            _context.Admins.Remove(GetAdminByID(adminID));
            return Save();
        }
        public bool AdminExists(int? id)
        {
            if(id == null) return true;

            return _context.Admins.Any(a => a.ID == id);
        }
        public bool AdminExists(AdminDto admin)
        {
            return _context.Admins.Any(a => a.Email == admin.Email);
        }
        
        public bool Save()
        {
            var result = _context.SaveChanges();
            return result > 0 ? true : false;
        }

		public Admin GetAdminByUsername(string username)
		{
            return _context.Admins.FirstOrDefault(a => a.Username == username || a.Email == username);
		}

		public bool AdminExists(string email)
		{
			return _context.Admins.Any(a => a.Email == email || a.Username == email);
		}

        public Admin UpdatePassword(LoginDto credentials)
        {
            var adminToUpdate = _context.Admins
                .Where(a =>  a.Username == credentials.UserName || a.Email == credentials.UserName).FirstOrDefault();

            return adminToUpdate;

        }
    }
}
