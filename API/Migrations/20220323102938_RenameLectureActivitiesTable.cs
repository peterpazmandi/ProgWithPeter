using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class RenameLectureActivitiesTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LectureActivity_AspNetUsers_AppUserId",
                table: "LectureActivity");

            migrationBuilder.DropForeignKey(
                name: "FK_LectureActivity_Lectures_LectureId",
                table: "LectureActivity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LectureActivity",
                table: "LectureActivity");

            migrationBuilder.RenameTable(
                name: "LectureActivity",
                newName: "LectureActivities");

            migrationBuilder.RenameIndex(
                name: "IX_LectureActivity_LectureId",
                table: "LectureActivities",
                newName: "IX_LectureActivities_LectureId");

            migrationBuilder.RenameIndex(
                name: "IX_LectureActivity_AppUserId",
                table: "LectureActivities",
                newName: "IX_LectureActivities_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LectureActivities",
                table: "LectureActivities",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LectureActivities_AspNetUsers_AppUserId",
                table: "LectureActivities",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LectureActivities_Lectures_LectureId",
                table: "LectureActivities",
                column: "LectureId",
                principalTable: "Lectures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LectureActivities_AspNetUsers_AppUserId",
                table: "LectureActivities");

            migrationBuilder.DropForeignKey(
                name: "FK_LectureActivities_Lectures_LectureId",
                table: "LectureActivities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LectureActivities",
                table: "LectureActivities");

            migrationBuilder.RenameTable(
                name: "LectureActivities",
                newName: "LectureActivity");

            migrationBuilder.RenameIndex(
                name: "IX_LectureActivities_LectureId",
                table: "LectureActivity",
                newName: "IX_LectureActivity_LectureId");

            migrationBuilder.RenameIndex(
                name: "IX_LectureActivities_AppUserId",
                table: "LectureActivity",
                newName: "IX_LectureActivity_AppUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LectureActivity",
                table: "LectureActivity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LectureActivity_AspNetUsers_AppUserId",
                table: "LectureActivity",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LectureActivity_Lectures_LectureId",
                table: "LectureActivity",
                column: "LectureId",
                principalTable: "Lectures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
