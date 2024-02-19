namespace AssetManagementSystem.Utils
{
	enum AssetStatuses
	{
		Available,
		Unavailable
	}
	public class AssetCatalogueUtils
	{
		public static bool AssetStatusIsValid(string status)
		{
			if(!Enum.IsDefined(typeof(AssetStatuses), status)) return false;
			return true;
		}
	}
}
