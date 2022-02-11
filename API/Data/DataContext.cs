using Microsoft.EntityFrameworkCore;
using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.Data
{
    public class DataContext: IdentityDbContext<
                                AppUser,
                                AppRole,
                                int,
                                IdentityUserClaim<int>,
                                AppUserRole,
                                IdentityUserLogin<int>,
                                IdentityRoleClaim<int>,
                                IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options): base(options)
        {
            
        }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Tutorial> Tutorials { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Meta> Metas { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Lecture> Lectures { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppUser>()
                .HasOne<Photo>(ur => ur.Photo)
                .WithOne(u => u.AppUser)
                .HasForeignKey<Photo>(p => p.AppUserId);
            builder.Entity<Photo>()
                .HasKey(a => a.Id);

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

            builder.Entity<Post>()
                .ToTable("Posts")
                .HasOne(p => p.AppUser)
                .WithMany(p => p.Posts)
                .HasForeignKey(p => p.AppUserId);
            builder.Entity<Post>()
                .ToTable("Posts")
                .HasOne(p => p.Category)
                .WithMany(p => p.Posts)
                .HasForeignKey(p => p.CategoryId);
            builder.Entity<Post>()
                .ToTable("Posts")
                .HasOne(p => p.Meta)
                .WithOne(p => p.Post)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Tutorial>()
                .ToTable("Tutorials")
                .HasOne(d => d.Post)
                .WithOne(p => p.Tutorial);

            builder.Entity<Course>()
                .ToTable("Courses")
                .HasOne(d => d.Post)
                .WithOne(p => p.Course);

            builder.Entity<Course>()
                .ToTable("Courses")
                .HasMany(d => d.Sections)
                .WithOne(p => p.Course)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Section>()
                .ToTable("Sections")
                .HasMany(s => s.Lectures)
                .WithOne(l => l.Section)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Lecture>()
                .ToTable("Lectures")
                .HasOne(d => d.Post)
                .WithOne(p => p.Lecture)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Post>()
                .ToTable("Posts")
                .HasOne(p => p.Lecture)
                .WithOne(l => l.Post)
                .OnDelete(DeleteBehavior.Cascade);
                
                
        }
    }

    public static class UtcDateAnnotation
    {
        private const String IsUtcAnnotation = "IsUtc";
        private static readonly ValueConverter<DateTime, DateTime> UtcConverter =
            new ValueConverter<DateTime, DateTime>(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

        private static readonly ValueConverter<DateTime?, DateTime?> UtcNullableConverter =
            new ValueConverter<DateTime?, DateTime?>(v => v, v => v == null ? v : DateTime.SpecifyKind(v.Value, DateTimeKind.Utc));

        public static PropertyBuilder<TProperty> IsUtc<TProperty>(this PropertyBuilder<TProperty> builder, Boolean isUtc = true) =>
            builder.HasAnnotation(IsUtcAnnotation, isUtc);

        public static Boolean IsUtc(this IMutableProperty property) =>
            ((Boolean?)property.FindAnnotation(IsUtcAnnotation)?.Value) ?? true;

        /// <summary>
        /// Make sure this is called after configuring all your entities.
        /// </summary>
        public static void ApplyUtcDateTimeConverter(this ModelBuilder builder)
        {
            foreach (var entityType in builder.Model.GetEntityTypes())
            {
            foreach (var property in entityType.GetProperties())
            {
                if (!property.IsUtc())
                {
                continue;
                }

                if (property.ClrType == typeof(DateTime))
                {
                property.SetValueConverter(UtcConverter);
                }

                if (property.ClrType == typeof(DateTime?))
                {
                property.SetValueConverter(UtcNullableConverter);
                }
            }
            }
        }
    }
}