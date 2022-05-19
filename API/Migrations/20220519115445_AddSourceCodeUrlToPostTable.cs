using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddSourceCodeUrlToPostTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SourceCodeUrl",
                table: "Posts",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SourceCodeUrl",
                table: "Posts");
        }
    }
}
