using AssetManagementSystem.Models;

namespace AssetManagementSystem.Interfaces
{
    public interface IExternalAuthRepository
    {
        public Task<ExternalAuth?> GetAccountByEmail(string email);

        public Task<bool> CreateAccount(ExternalAuth account);

    }
}
