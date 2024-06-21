using AssetManagementSystem.Dto;
using AssetManagementSystem.Models;
using AssetManagementSystem.ViewModels;

namespace AssetManagementSystem.Interfaces
{
    public interface IEmployeeRepository
    {
        public Task<ICollection<EmployeeAdminViewModel>> GetAllEmployees();
        public Task<EmployeeAdminViewModel?> GetEmployeeByID(int employeeID);
        public Task<Employee> GetEmployeeByIDWithCredentials(int employeeID);
        public Task<Employee> GetEmployeeByUserName(string username);
        public Task<bool> CreateEmployee(Employee employee);
        public Task<bool> UpdateEmployee(Employee employee);
        public Task<bool>    DeleteEmployee(int employeeID);
        public Task<bool> EmployeeExists(int employeeID);
        public Task<bool> EmployeeExists(EmployeeDto employee);
        public Task<bool> EmployeeExists(string email);
        public Task<bool> Save();
    }
}
