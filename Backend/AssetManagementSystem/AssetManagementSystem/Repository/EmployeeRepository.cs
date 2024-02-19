using AssetManagementSystem.Data;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using AssetManagementSystem.ViewModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace AssetManagementSystem.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AssetManagementSystemContext _context;
		private readonly IMapper _mapper;

		public EmployeeRepository(AssetManagementSystemContext context, IMapper mapper)
        {
            _context = context;
			_mapper = mapper;
		}

        public bool CreateEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            return Save();
        }

        public bool DeleteEmployee(int employeeID)
        {
            var employee = GetEmployeeByID(employeeID);
            _context.Employees.Remove(_mapper.Map<Employee>(employee));
            return Save();
        }

        public bool EmployeeExists(int employeeID)
        {
            return _context.Employees.Any(e => e.ID == employeeID);
        }

        public ICollection<EmployeeAdminViewModel> GetAllEmployees()
        {
            return _context.Employees
                .Include(e => e.AssetAllocationDetails)
                .Select(e => new EmployeeAdminViewModel()
                {
                    ID = e.ID,
                    Name = e.Name,
                    Email = e.Email,
                    Username = e.Username,
                    Gender = e.Gender,
                    ContactNumber = e.ContactNumber,
                    Address = e.Address,
                    AssetsAllocated = e.AssetAllocationDetails.Count()
                })
                .ToList();
        }

        public EmployeeAdminViewModel? GetEmployeeByID(int employeeID)
        {
            return _context.Employees
                .Where(e => e.ID == employeeID)
                .Include(e => e.AssetAllocationDetails)
                .Select(e => new EmployeeAdminViewModel()
                {
                    ID = e.ID,
                    Name = e.Name,
                    Email = e.Email,
                    Username = e.Username,
                    Gender = e.Gender,
                    ContactNumber = e.ContactNumber,
                    Address = e.Address,
                    AssetsAllocated = e.AssetAllocationDetails.Count()
                })
                .AsNoTracking().FirstOrDefault();
        }

        public bool Save()
        {
            var result = _context.SaveChanges();
            return result > 0;
        }

        public bool UpdateEmployee(Employee employee)
        {
            _context.Employees.Update(employee);
            return Save();
        }

		public bool EmployeeExists(EmployeeDto employee)
		{
            //When creating employee
            if(employee.ID == 0)
                return _context.Employees.Any(e => e.Username == employee.Username || e.Email == employee.Email);

            //When updating employee
            //Checking if there is any other employee with the same email as the one to be updated
			return _context.Employees.Any(e => e.ID != employee.ID && e.Email == employee.Email);
		}

		public Employee GetEmployeeByIDWithCredentials(int employeeID)
		{
            return _context.Employees.AsNoTracking().FirstOrDefault(e => e.ID == employeeID);
		}

		public Employee GetEmployeeByUserName(string username)
		{
			return _context.Employees.AsNoTracking().FirstOrDefault(a => a.Username == username);
		}

		public bool EmployeeExists(string email)
		{
			return _context.Employees.Any(e => e.Email == email);
		}
	}
}
