using AssetManagementSystem.Dto;
using AssetManagementSystem.Models;
using AssetManagementSystem.ViewModels;
using AutoMapper;

namespace AssetManagementSystem.Profiles
{
    public class AssetMangementSystemProfile : Profile
    {
        public AssetMangementSystemProfile()
        {
            CreateMap<Admin, RegistrationDto>();
            CreateMap<RegistrationDto, Admin>();
            CreateMap<Employee, EmployeeDto>();
            CreateMap<EmployeeDto, Employee>();
            CreateMap<Asset, AssetDto>();
            CreateMap<AssetDto, Asset>();
            CreateMap<AssetAuditReportRequestDto, AssetAuditReportRequest>();
            CreateMap<AssetAuditReportRequest, AssetAuditReportRequestDto>();
            CreateMap<Employee, EmployeeAdminViewModel>();
            CreateMap<EmployeeAdminViewModel, Employee>();
            CreateMap<AssetCategory, AssetCategoryDto>();
            CreateMap<AssetCategoryDto, AssetCategory>();
            CreateMap<AssetServiceRequest, AssetServiceRequestDto>();
            CreateMap<AssetServiceRequestDto, AssetServiceRequest>();
            CreateMap<AssetAllocationDetailDto, AssetAllocationDetail>();
            CreateMap<AssetAllocationDetail, AssetAllocationDetailDto>();
            CreateMap<AssetBorrowAndReturnRequest, AssetBorrowAndReturnRequestDto>();
            CreateMap<AssetBorrowAndReturnRequestDto, AssetBorrowAndReturnRequest>();
            CreateMap<RegistrationDto, AdminDto>();
            CreateMap<RegistrationDto, EmployeeDto>();
            CreateMap<Admin, AdminDto>();
            CreateMap<AdminDto, Admin>();
        }
	}
}
