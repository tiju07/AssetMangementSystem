namespace AssetManagementSystem.Interfaces
{
	public interface IAuthUtilityRepository
	{
		public bool CheckPassword(string password, byte[] passwordSalt, byte[] passwordHash);

		public dynamic JwtGenerator(int userID, string name, string role);
	}
}
