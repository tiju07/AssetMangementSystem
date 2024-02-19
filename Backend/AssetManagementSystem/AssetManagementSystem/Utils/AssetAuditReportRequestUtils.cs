namespace AssetManagementSystem.Utils
{
	enum Statuses
	{
		Pending,
		Verified,
		Rejected
	}
	public class AssetAuditReportRequestUtils
	{
		
		public static bool RequestStatusIsValid(string status)
		{

			if (Enum.IsDefined(typeof(Statuses), status)) return true;

			return false;
		}
	}
}
