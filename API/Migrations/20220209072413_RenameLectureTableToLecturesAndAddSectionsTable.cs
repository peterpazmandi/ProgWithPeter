using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class RenameLectureTableToLecturesAndAddSectionsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseSection_Section_SectionsId",
                table: "CourseSection");

            migrationBuilder.DropForeignKey(
                name: "FK_Lecture_Posts_PostId",
                table: "Lecture");

            migrationBuilder.DropForeignKey(
                name: "FK_LectureSection_Lecture_LecturesId",
                table: "LectureSection");

            migrationBuilder.DropForeignKey(
                name: "FK_LectureSection_Section_SectionsId",
                table: "LectureSection");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Section",
                table: "Section");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lecture",
                table: "Lecture");

            migrationBuilder.RenameTable(
                name: "Section",
                newName: "Sections");

            migrationBuilder.RenameTable(
                name: "Lecture",
                newName: "Lectures");

            migrationBuilder.RenameIndex(
                name: "IX_Lecture_PostId",
                table: "Lectures",
                newName: "IX_Lectures_PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sections",
                table: "Sections",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lectures",
                table: "Lectures",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseSection_Sections_SectionsId",
                table: "CourseSection",
                column: "SectionsId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lectures_Posts_PostId",
                table: "Lectures",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LectureSection_Lectures_LecturesId",
                table: "LectureSection",
                column: "LecturesId",
                principalTable: "Lectures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LectureSection_Sections_SectionsId",
                table: "LectureSection",
                column: "SectionsId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseSection_Sections_SectionsId",
                table: "CourseSection");

            migrationBuilder.DropForeignKey(
                name: "FK_Lectures_Posts_PostId",
                table: "Lectures");

            migrationBuilder.DropForeignKey(
                name: "FK_LectureSection_Lectures_LecturesId",
                table: "LectureSection");

            migrationBuilder.DropForeignKey(
                name: "FK_LectureSection_Sections_SectionsId",
                table: "LectureSection");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Sections",
                table: "Sections");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lectures",
                table: "Lectures");

            migrationBuilder.RenameTable(
                name: "Sections",
                newName: "Section");

            migrationBuilder.RenameTable(
                name: "Lectures",
                newName: "Lecture");

            migrationBuilder.RenameIndex(
                name: "IX_Lectures_PostId",
                table: "Lecture",
                newName: "IX_Lecture_PostId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Section",
                table: "Section",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lecture",
                table: "Lecture",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseSection_Section_SectionsId",
                table: "CourseSection",
                column: "SectionsId",
                principalTable: "Section",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lecture_Posts_PostId",
                table: "Lecture",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LectureSection_Lecture_LecturesId",
                table: "LectureSection",
                column: "LecturesId",
                principalTable: "Lecture",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LectureSection_Section_SectionsId",
                table: "LectureSection",
                column: "SectionsId",
                principalTable: "Section",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
