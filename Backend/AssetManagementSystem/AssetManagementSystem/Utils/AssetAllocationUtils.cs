namespace AssetManagementSystem.Utils
{
    public class AssetAllocationUtils
    {
        public static bool AllocationStatusIsValid(string allocationStatus)
        {
            ICollection<string> acceptedStatus = new string[] { "Allocated", "Deallocated" };
            if (!acceptedStatus.Contains(allocationStatus)) return false;

            return true;
        }
    }
}
