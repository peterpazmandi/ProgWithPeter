using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class MoveStatusFromPostToTutorialAndCourse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Posts");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Tutorials",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Courses",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Tutorials");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Courses");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Posts",
                type: "TEXT",
                nullable: true);
        }
    }
}
