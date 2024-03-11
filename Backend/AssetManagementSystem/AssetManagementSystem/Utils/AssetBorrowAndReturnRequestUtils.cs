namespace AssetManagementSystem.Utils
{
	enum RequestTypes
	{
		Borrow,
		Return
	}
    enum BorrowReturnRequestStatus
    {
        Open,
        Closed,
        Servicing,
        Rejected
    }
    public class AssetBorrowAndReturnRequestUtils
	{
		public static bool RequestTypeIsValid(string type)
		{
			if(Enum.IsDefined(typeof(RequestTypes), type)) return true;

			return false;
		}

		public static bool RequestStatusIsValid(string status)
		{
			if(Enum.IsDefined(typeof(BorrowReturnRequestStatus), status)) return true;
			return false;
		}
	}
}
