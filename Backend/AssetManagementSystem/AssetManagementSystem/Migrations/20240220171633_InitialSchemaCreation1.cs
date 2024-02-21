using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagementSystem.Migrations
{
    public partial class InitialSchemaCreation1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "AssetCategories",
                columns: table => new
                {
                    CategoryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CategoryDescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetCategories", x => x.CategoryID);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ContactNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "AssetCatalogue",
                columns: table => new
                {
                    AssetID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AssetName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AssetCategoryID = table.Column<int>(type: "int", nullable: false),
                    AssetModel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AssetSpecifications = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AssetImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AssetDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AssetStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ManufacturingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ExpiryDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AssetValue = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetCatalogue", x => x.AssetID);
                    table.ForeignKey(
                        name: "FK_AssetCatalogue_AssetCategories_AssetCategoryID",
                        column: x => x.AssetCategoryID,
                        principalTable: "AssetCategories",
                        principalColumn: "CategoryID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AssetAllocationDetails",
                columns: table => new
                {
                    AssetAllocationID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeID = table.Column<int>(type: "int", nullable: false),
                    AssetID = table.Column<int>(type: "int", nullable: false),
                    AssetCount = table.Column<int>(type: "int", nullable: false),
                    AllocationDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AssetAllocatedFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AssetAllocatedTill = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AllocationStatus = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetAllocationDetails", x => x.AssetAllocationID);
                    table.ForeignKey(
                        name: "FK_AssetAllocationDetails_AssetCatalogue_AssetID",
                        column: x => x.AssetID,
                        principalTable: "AssetCatalogue",
                        principalColumn: "AssetID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssetAllocationDetails_Employees_EmployeeID",
                        column: x => x.EmployeeID,
                        principalTable: "Employees",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AssetAuditReportRequests",
                columns: table => new
                {
                    RequestID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeID = table.Column<int>(type: "int", nullable: false),
                    AssetID = table.Column<int>(type: "int", nullable: false),
                    RequestDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RequestStatus = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetAuditReportRequests", x => x.RequestID);
                    table.ForeignKey(
                        name: "FK_AssetAuditReportRequests_AssetCatalogue_AssetID",
                        column: x => x.AssetID,
                        principalTable: "AssetCatalogue",
                        principalColumn: "AssetID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssetAuditReportRequests_Employees_EmployeeID",
                        column: x => x.EmployeeID,
                        principalTable: "Employees",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AssetBorrowAndReturnRequests",
                columns: table => new
                {
                    RequestID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeID = table.Column<int>(type: "int", nullable: false),
                    AdminID = table.Column<int>(type: "int", nullable: false),
                    AssetID = table.Column<int>(type: "int", nullable: false),
                    AssetRequestType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AssetAllocationFrom = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AssetAllocationTill = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AssetCount = table.Column<int>(type: "int", nullable: false),
                    RequestDetails = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetBorrowAndReturnRequests", x => x.RequestID);
                    table.ForeignKey(
                        name: "FK_AssetBorrowAndReturnRequests_Admins_AdminID",
                        column: x => x.AdminID,
                        principalTable: "Admins",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssetBorrowAndReturnRequests_AssetCatalogue_AssetID",
                        column: x => x.AssetID,
                        principalTable: "AssetCatalogue",
                        principalColumn: "AssetID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssetBorrowAndReturnRequests_Employees_EmployeeID",
                        column: x => x.EmployeeID,
                        principalTable: "Employees",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AssetServiceRequests",
                columns: table => new
                {
                    RequestID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeID = table.Column<int>(type: "int", nullable: false),
                    AssetID = table.Column<int>(type: "int", nullable: false),
                    IssueType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RequestDetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RequestStatus = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetServiceRequests", x => x.RequestID);
                    table.ForeignKey(
                        name: "FK_AssetServiceRequests_AssetCatalogue_AssetID",
                        column: x => x.AssetID,
                        principalTable: "AssetCatalogue",
                        principalColumn: "AssetID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssetServiceRequests_Employees_EmployeeID",
                        column: x => x.EmployeeID,
                        principalTable: "Employees",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssetAllocationDetails_AssetID",
                table: "AssetAllocationDetails",
                column: "AssetID");

            migrationBuilder.CreateIndex(
                name: "IX_AssetAllocationDetails_EmployeeID",
                table: "AssetAllocationDetails",
                column: "EmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_AssetAuditReportRequests_AssetID",
                table: "AssetAuditReportRequests",
                column: "AssetID");

            migrationBuilder.CreateIndex(
                name: "IX_AssetAuditReportRequests_EmployeeID",
                table: "AssetAuditReportRequests",
                column: "EmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_AssetBorrowAndReturnRequests_AdminID",
                table: "AssetBorrowAndReturnRequests",
                column: "AdminID");

            migrationBuilder.CreateIndex(
                name: "IX_AssetBorrowAndReturnRequests_AssetID",
                table: "AssetBorrowAndReturnRequests",
                column: "AssetID");

            migrationBuilder.CreateIndex(
                name: "IX_AssetBorrowAndReturnRequests_EmployeeID",
                table: "AssetBorrowAndReturnRequests",
                column: "EmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_AssetCatalogue_AssetCategoryID",
                table: "AssetCatalogue",
                column: "AssetCategoryID");

            migrationBuilder.CreateIndex(
                name: "IX_AssetServiceRequests_AssetID",
                table: "AssetServiceRequests",
                column: "AssetID");

            migrationBuilder.CreateIndex(
                name: "IX_AssetServiceRequests_EmployeeID",
                table: "AssetServiceRequests",
                column: "EmployeeID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssetAllocationDetails");

            migrationBuilder.DropTable(
                name: "AssetAuditReportRequests");

            migrationBuilder.DropTable(
                name: "AssetBorrowAndReturnRequests");

            migrationBuilder.DropTable(
                name: "AssetServiceRequests");

            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "AssetCatalogue");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "AssetCategories");
        }
    }
}
