using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class RemovePluralFromSectionAndLectureTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lectures_Sections_SectionsId",
                table: "Lectures");

            migrationBuilder.DropForeignKey(
                name: "FK_Sections_Courses_CoursesId",
                table: "Sections");

            migrationBuilder.RenameColumn(
                name: "CoursesId",
                table: "Sections",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Sections_CoursesId",
                table: "Sections",
                newName: "IX_Sections_CourseId");

            migrationBuilder.RenameColumn(
                name: "SectionsId",
                table: "Lectures",
                newName: "SectionId");

            migrationBuilder.RenameIndex(
                name: "IX_Lectures_SectionsId",
                table: "Lectures",
                newName: "IX_Lectures_SectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lectures_Sections_SectionId",
                table: "Lectures",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Sections_Courses_CourseId",
                table: "Sections",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lectures_Sections_SectionId",
                table: "Lectures");

            migrationBuilder.DropForeignKey(
                name: "FK_Sections_Courses_CourseId",
                table: "Sections");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "Sections",
                newName: "CoursesId");

            migrationBuilder.RenameIndex(
                name: "IX_Sections_CourseId",
                table: "Sections",
                newName: "IX_Sections_CoursesId");

            migrationBuilder.RenameColumn(
                name: "SectionId",
                table: "Lectures",
                newName: "SectionsId");

            migrationBuilder.RenameIndex(
                name: "IX_Lectures_SectionId",
                table: "Lectures",
                newName: "IX_Lectures_SectionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lectures_Sections_SectionsId",
                table: "Lectures",
                column: "SectionsId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Sections_Courses_CoursesId",
                table: "Sections",
                column: "CoursesId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
