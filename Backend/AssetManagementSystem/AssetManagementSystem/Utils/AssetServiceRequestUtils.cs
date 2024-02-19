namespace AssetManagementSystem.Utils
{
	enum IssueTypes
	{
		Malfunction,
		Repair
	}
	enum RequestStatus
	{
		Open,
		Closed,
		Servicing,
		Rejected
	}
	public class AssetServiceRequestUtils
	{
		public static bool IssueTypeIsValid(string type)
		{
			if(Enum.IsDefined(typeof(IssueTypes), type)) return true;
			return false;
		}

		public static bool RequestStatusIsValid(string type)
		{
			if(Enum.IsDefined(typeof(RequestStatus), type)) return true;
			return false;
		}
	}
}
