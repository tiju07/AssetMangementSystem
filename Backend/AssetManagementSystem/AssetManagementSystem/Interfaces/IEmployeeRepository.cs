using AssetManagementSystem.Dto;
using AssetManagementSystem.Models;
using AssetManagementSystem.ViewModels;

namespace AssetManagementSystem.Interfaces
{
    public interface IEmployeeRepository
    {
        public ICollection<EmployeeAdminViewModel> GetAllEmployees();
        public EmployeeAdminViewModel? GetEmployeeByID(int employeeID);
        public Employee GetEmployeeByIDWithCredentials(int employeeID);
        public Employee GetEmployeeByUserName(string username);
        public bool CreateEmployee(Employee employee);
        public bool UpdateEmployee(Employee employee);
        public bool DeleteEmployee(int employeeID);
        public bool EmployeeExists(int employeeID);
        public bool EmployeeExists(EmployeeDto employee);
        public bool EmployeeExists(string email);
        public bool Save();
    }
}
