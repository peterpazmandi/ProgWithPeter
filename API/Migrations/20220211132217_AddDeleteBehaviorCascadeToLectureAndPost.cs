using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddDeleteBehaviorCascadeToLectureAndPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lectures_Sections_SectionId",
                table: "Lectures");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Metas_MetaId",
                table: "Posts");

            migrationBuilder.AddForeignKey(
                name: "FK_Lectures_Sections_SectionId",
                table: "Lectures",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Metas_MetaId",
                table: "Posts",
                column: "MetaId",
                principalTable: "Metas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lectures_Sections_SectionId",
                table: "Lectures");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Metas_MetaId",
                table: "Posts");

            migrationBuilder.AddForeignKey(
                name: "FK_Lectures_Sections_SectionId",
                table: "Lectures",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Metas_MetaId",
                table: "Posts",
                column: "MetaId",
                principalTable: "Metas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
