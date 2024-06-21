using AssetManagementSystem.Data;
using AssetManagementSystem.Dto;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Models;
using AssetManagementSystem.ViewModels;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

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

        public async Task<bool> CreateEmployee(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            return await Save();
        }

        public async Task<bool> DeleteEmployee(int employeeID)
        {
            var employee = await GetEmployeeByID(employeeID);
            _context.Employees.Remove(_mapper.Map<Employee>(employee));
            return await Save();
        }

        public async Task<bool> EmployeeExists(int employeeID)
        {
            return await _context.Employees.AnyAsync(e => e.ID == employeeID);
        }

        public async Task<ICollection<EmployeeAdminViewModel>> GetAllEmployees()
        {
            return await _context.Employees
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
                .ToListAsync();
        }

        public async Task<EmployeeAdminViewModel?> GetEmployeeByID(int employeeID)
        {
            return await _context.Employees
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
                .AsNoTracking().FirstOrDefaultAsync();
        }

        public async Task<bool> Save()
        {
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> UpdateEmployee(Employee employee)
        {
            _context.Employees.Update(employee);
            return await Save();
        }

		public async Task<bool> EmployeeExists(EmployeeDto employee)
		{
            //When creating employee
            if(employee.ID == 0)
                return await _context.Employees.AnyAsync(e => e.Username == employee.Username || e.Email == employee.Email);

            //When updating employee
            //Checking if there is any other employee with the same email as the one to be updated
			return await _context.Employees.AnyAsync(e => e.ID != employee.ID && e.Email == employee.Email);
		}

		public async Task<Employee> GetEmployeeByIDWithCredentials(int employeeID)
		{
            return await _context.Employees.AsNoTracking().FirstOrDefaultAsync(e => e.ID == employeeID);
		}

		public async Task<Employee> GetEmployeeByUserName(string username)
		{
			return await _context.Employees.AsNoTracking().FirstOrDefaultAsync(a => a.Username == username || a.Email == username);
		}

		public async Task<bool> EmployeeExists(string email)
		{
			return await _context.Employees.AnyAsync(e => e.Email == email || e.Username == email);
		}
	}
}
