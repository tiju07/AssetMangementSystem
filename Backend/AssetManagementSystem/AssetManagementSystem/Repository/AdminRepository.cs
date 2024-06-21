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
        public async Task<Admin?> GetAdminByID(int id)
        {
            return await _context.Admins.AsNoTracking().FirstOrDefaultAsync(a => a.ID == id);
        }
        public async Task<bool> UpdateAdmin(Admin admin)
        {
            _context.Admins.Update(admin);
            return await Save();
        }
        public async Task<bool> CreateAdmin(Admin admin)
        {
            await _context.Admins.AddAsync(admin);
            return await Save();
        }
        public async Task<bool> DeleteAdmin(int adminID)
        {
            _context.Admins.Remove(await GetAdminByID(adminID));
            return await Save();
        }
        public async Task<bool> AdminExists(int? id)
        {
            if(id == null) return true;

            return await _context.Admins.AnyAsync(a => a.ID == id);
        }
        public async Task<bool> AdminExists(AdminDto admin)
        {
            return await _context.Admins.AnyAsync(a => a.Email == admin.Email);
        }
        
        public async Task<bool> Save()
        {
            var result = await _context.SaveChangesAsync();
            return result > 0 ? true : false;
        }

		public async Task<Admin> GetAdminByUsername(string username)
		{
            return await _context.Admins.FirstOrDefaultAsync(a => a.Username == username || a.Email == username);
		}

		public async Task<bool> AdminExists(string email)
		{
			return await _context.Admins.AnyAsync(a => a.Email == email || a.Username == email);
		}

        public async Task<Admin> UpdatePassword(LoginDto credentials)
        {
            var adminToUpdate = await _context.Admins
                .Where(a =>  a.Username == credentials.UserName || a.Email == credentials.UserName).FirstOrDefaultAsync();

            return adminToUpdate;

        }

        public async Task<ICollection<Admin>> GetAdminsWithPendingAccess()
        {
            return await _context.Admins.Where(a => !a.IsVerified).ToListAsync();
        }
    }
}
