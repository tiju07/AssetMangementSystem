using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AssetManagementSystem.Migrations
{
    public partial class ModifyAssetModelImageProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AssetImage",
                table: "AssetCatalogue",
                newName: "AssetImageURL");

            migrationBuilder.AddColumn<string>(
                name: "AssetImageFilename",
                table: "AssetCatalogue",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssetImageFilename",
                table: "AssetCatalogue");

            migrationBuilder.RenameColumn(
                name: "AssetImageURL",
                table: "AssetCatalogue",
                newName: "AssetImage");
        }
    }
}
