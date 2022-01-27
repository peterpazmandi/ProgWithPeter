using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddCourseSectionLectureTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Posts_PostId",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_PostId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Courses");

            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "Posts",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Lecture",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PostId = table.Column<int>(type: "INTEGER", nullable: false),
                    Position = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lecture", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lecture_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Section",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Section", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CourseSection",
                columns: table => new
                {
                    CoursesId = table.Column<int>(type: "INTEGER", nullable: false),
                    TagsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseSection", x => new { x.CoursesId, x.TagsId });
                    table.ForeignKey(
                        name: "FK_CourseSection_Courses_CoursesId",
                        column: x => x.CoursesId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseSection_Section_TagsId",
                        column: x => x.TagsId,
                        principalTable: "Section",
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
                        name: "FK_LectureSection_Lecture_LecturesId",
                        column: x => x.LecturesId,
                        principalTable: "Lecture",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LectureSection_Section_SectionsId",
                        column: x => x.SectionsId,
                        principalTable: "Section",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Posts_CourseId",
                table: "Posts",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseSection_TagsId",
                table: "CourseSection",
                column: "TagsId");

            migrationBuilder.CreateIndex(
                name: "IX_Lecture_PostId",
                table: "Lecture",
                column: "PostId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LectureSection_SectionsId",
                table: "LectureSection",
                column: "SectionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Courses_CourseId",
                table: "Posts",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Courses_CourseId",
                table: "Posts");

            migrationBuilder.DropTable(
                name: "CourseSection");

            migrationBuilder.DropTable(
                name: "LectureSection");

            migrationBuilder.DropTable(
                name: "Lecture");

            migrationBuilder.DropTable(
                name: "Section");

            migrationBuilder.DropIndex(
                name: "IX_Posts_CourseId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Posts");

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "Courses",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Courses_PostId",
                table: "Courses",
                column: "PostId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Posts_PostId",
                table: "Courses",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
