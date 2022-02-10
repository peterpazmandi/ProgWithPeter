using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class ChangeCorsesSectionsAndSectionsLecturesToOneToManyRelationsship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseSection");

            migrationBuilder.DropTable(
                name: "LectureSection");

            migrationBuilder.AddColumn<int>(
                name: "CoursesId",
                table: "Sections",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SectionsId",
                table: "Lectures",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Sections_CoursesId",
                table: "Sections",
                column: "CoursesId");

            migrationBuilder.CreateIndex(
                name: "IX_Lectures_SectionsId",
                table: "Lectures",
                column: "SectionsId");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lectures_Sections_SectionsId",
                table: "Lectures");

            migrationBuilder.DropForeignKey(
                name: "FK_Sections_Courses_CoursesId",
                table: "Sections");

            migrationBuilder.DropIndex(
                name: "IX_Sections_CoursesId",
                table: "Sections");

            migrationBuilder.DropIndex(
                name: "IX_Lectures_SectionsId",
                table: "Lectures");

            migrationBuilder.DropColumn(
                name: "CoursesId",
                table: "Sections");

            migrationBuilder.DropColumn(
                name: "SectionsId",
                table: "Lectures");

            migrationBuilder.CreateTable(
                name: "CourseSection",
                columns: table => new
                {
                    CoursesId = table.Column<int>(type: "INTEGER", nullable: false),
                    SectionsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseSection", x => new { x.CoursesId, x.SectionsId });
                    table.ForeignKey(
                        name: "FK_CourseSection_Courses_CoursesId",
                        column: x => x.CoursesId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseSection_Sections_SectionsId",
                        column: x => x.SectionsId,
                        principalTable: "Sections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LectureSection",
                columns: table => new
                {
                    LecturesId = table.Column<int>(type: "INTEGER", nullable: false),
                    SectionsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LectureSection", x => new { x.LecturesId, x.SectionsId });
                    table.ForeignKey(
                        name: "FK_LectureSection_Lectures_LecturesId",
                        column: x => x.LecturesId,
                        principalTable: "Lectures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LectureSection_Sections_SectionsId",
                        column: x => x.SectionsId,
                        principalTable: "Sections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseSection_SectionsId",
                table: "CourseSection",
                column: "SectionsId");

            migrationBuilder.CreateIndex(
                name: "IX_LectureSection_SectionsId",
                table: "LectureSection",
                column: "SectionsId");
        }
    }
}
