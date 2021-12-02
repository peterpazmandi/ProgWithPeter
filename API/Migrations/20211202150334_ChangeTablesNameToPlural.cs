using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class ChangeTablesNameToPlural : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Course_Posts_PostId",
                table: "Course");

            migrationBuilder.DropForeignKey(
                name: "FK_Tutorial_Posts_PostId",
                table: "Tutorial");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tutorial",
                table: "Tutorial");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Course",
                table: "Course");

            migrationBuilder.RenameTable(
                name: "Tutorial",
                newName: "Tutorials");

            migrationBuilder.RenameTable(
                name: "Course",
                newName: "Courses");

            migrationBuilder.RenameIndex(
                name: "IX_Tutorial_PostId",
                table: "Tutorials",
                newName: "IX_Tutorials_PostId");

            migrationBuilder.RenameIndex(
                name: "IX_Course_PostId",
                table: "Courses",
                newName: "IX_Courses_PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tutorials",
                table: "Tutorials",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Courses",
                table: "Courses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Posts_PostId",
                table: "Courses",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tutorials_Posts_PostId",
                table: "Tutorials",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Posts_PostId",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Tutorials_Posts_PostId",
                table: "Tutorials");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tutorials",
                table: "Tutorials");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Courses",
                table: "Courses");

            migrationBuilder.RenameTable(
                name: "Tutorials",
                newName: "Tutorial");

            migrationBuilder.RenameTable(
                name: "Courses",
                newName: "Course");

            migrationBuilder.RenameIndex(
                name: "IX_Tutorials_PostId",
                table: "Tutorial",
                newName: "IX_Tutorial_PostId");

            migrationBuilder.RenameIndex(
                name: "IX_Courses_PostId",
                table: "Course",
                newName: "IX_Course_PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tutorial",
                table: "Tutorial",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Course",
                table: "Course",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Course_Posts_PostId",
                table: "Course",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tutorial_Posts_PostId",
                table: "Tutorial",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
