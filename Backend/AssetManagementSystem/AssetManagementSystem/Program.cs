using Asp.Versioning;
using AssetManagementSystem;
using AssetManagementSystem.Data;
using AssetManagementSystem.Interfaces;
using AssetManagementSystem.Repository;
using AssetManagementSystem.Swagger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Configuration;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
Microsoft.Extensions.Configuration.ConfigurationManager configuration = builder.Configuration;

builder.Logging.ClearProviders();
builder.Logging.AddLog4Net();


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();
builder.Services.AddSwaggerGen(options =>
{
	options.OperationFilter<SwaggerDefaultValues>();
});

builder.Services.AddApiVersioning(opt =>
{
	opt.DefaultApiVersion = new ApiVersion(1, 0);
	opt.AssumeDefaultVersionWhenUnspecified = true;
	opt.ReportApiVersions = true;
	opt.ApiVersionReader = new UrlSegmentApiVersionReader();
});

builder.Services.AddApiVersioning().AddApiExplorer(options =>
{
	options.GroupNameFormat = "'v'VVV";
	options.SubstituteApiVersionInUrl = true;
});


builder.Services.AddDbContext<AssetManagementSystemContext>(options =>
{
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")??String.Empty);
});

builder.Services.Configure<AppSettings>(
	builder.Configuration.GetSection("ApplicationSettings")
);

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IAssetAllocationRepository, AssetAllocationRepository>();
builder.Services.AddScoped<IAssetAuditReportRequestRepository, AssetAuditReportRequestRepository>();
builder.Services.AddScoped<IAssetBorrowAndReturnRequestRepository, AssetBorrowAndReturnRequestRepository>();
builder.Services.AddScoped<IAssetCatalogueRepository, AssetCatalogueRepository>();
builder.Services.AddScoped<IAssetCategoryRepository, AssetCategoryRepository>();
builder.Services.AddScoped<IAssetServiceRequestRepository, AssetServiceRequestRepository>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IAuthUtilityRepository, AuthUtilityRepository>();
builder.Services.AddTransient<IEmailService, EmailService>();

builder.Services.AddAuthentication(x =>
{
	x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddCookie(x =>
{
	x.Cookie.Name = "token";

}).AddJwtBearer(x =>
{
	x.RequireHttpsMetadata = false;
	x.SaveToken = true;
	x.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuerSigningKey = true,
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["ApplicationSettings:Secret"]??"")),
		ValidateIssuer = false,
		ValidateAudience = false
	};
	x.Events = new JwtBearerEvents
	{
		OnMessageReceived = context =>
		{
			context.Token = context.Request.Cookies["token"];
			return Task.CompletedTask;
		}
	};
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI(options =>
	{
		var descriptions = app.DescribeApiVersions();

		foreach (var description in descriptions)
		{
			var url = $"/swagger/{description.GroupName}/swagger.json";
			var name = description.GroupName.ToUpperInvariant();
			options.SwaggerEndpoint(url, name);
		}
	});
}

app.UseCors(x => x
		   .WithOrigins("http://localhost:4200")
		   .AllowAnyMethod()
		   .AllowAnyHeader()
		   .AllowCredentials());

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
