namespace AssetManagementSystem.Utils
{
	enum RequestTypes
	{
		Borrow,
		Return
	}
	public class AssetBorrowAndReturnRequestUtils
	{
		public static bool RequestTypeIsValid(string type)
		{
			if(Enum.IsDefined(typeof(RequestTypes), type)) return true;

			return false;
		}
	}
}
