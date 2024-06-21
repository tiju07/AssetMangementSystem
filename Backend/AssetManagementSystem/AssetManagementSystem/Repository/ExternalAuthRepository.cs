using AssetManagementSystem.Data;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace AssetManagementSystem.Repository
{
    public class ExternalAuthRepository : IExternalAuthRepository
    {
        private readonly AssetManagementSystemContext _context;

        public ExternalAuthRepository(AssetManagementSystemContext context)
        {
            this._context = context;
        }
        public async Task<bool> CreateAccount(ExternalAuth account)
        {
            await _context.ExternalAuth.AddAsync(account);
            return await Save();
        }

        public async Task<ExternalAuth?> GetAccountByEmail(string email)
        {
            return await _context.ExternalAuth.FirstOrDefaultAsync(x => x.Email == email);
        }

        private async Task<bool> Save()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
