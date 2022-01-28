using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class UpdateCourseTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseSection_Section_TagsId",
                table: "CourseSection");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Courses_CourseId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_CourseId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "TagsId",
                table: "CourseSection",
                newName: "SectionsId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseSection_TagsId",
                table: "CourseSection",
                newName: "IX_CourseSection_SectionsId");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Courses",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ModificationDate",
                table: "Courses",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "PostId",
                table: "Courses",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "PublishDate",
                table: "Courses",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

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

            migrationBuilder.AddForeignKey(
                name: "FK_CourseSection_Section_SectionsId",
                table: "CourseSection",
                column: "SectionsId",
                principalTable: "Section",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Posts_PostId",
                table: "Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseSection_Section_SectionsId",
                table: "CourseSection");

            migrationBuilder.DropIndex(
                name: "IX_Courses_PostId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "ModificationDate",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "PublishDate",
                table: "Courses");

            migrationBuilder.RenameColumn(
                name: "SectionsId",
                table: "CourseSection",
                newName: "TagsId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseSection_SectionsId",
                table: "CourseSection",
                newName: "IX_CourseSection_TagsId");

            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "Posts",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_CourseId",
                table: "Posts",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseSection_Section_TagsId",
                table: "CourseSection",
                column: "TagsId",
                principalTable: "Section",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Courses_CourseId",
                table: "Posts",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
