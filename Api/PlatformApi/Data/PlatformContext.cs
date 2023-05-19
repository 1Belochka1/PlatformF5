using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using PlatformApi.Models;

namespace PlatformApi.Data;

public partial class PlatformContext : DbContext
{
    public PlatformContext()
    {
    }

    public PlatformContext(DbContextOptions<PlatformContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Role> Roles { get; set; }
    
    public virtual DbSet<Status> Statuses { get; set; }


    public virtual DbSet<Tasks> Tasks { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserInfo> UserInfos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.IdRole).HasName("PRIMARY");

            entity
                .HasCharSet("utf8mb3")
                .UseCollation("utf8mb3_general_ci");

            entity.HasIndex(e => e.Name, "Name_UNIQUE").IsUnique();

            entity.Property(e => e.Name).HasMaxLength(50);
        });
        
        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.IdStatus).HasName("PRIMARY");

            entity.ToTable("Status");

            entity.Property(e => e.IdStatus).ValueGeneratedNever();
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Tasks>(entity =>
        {
            entity.HasKey(e => e.IdTasks).HasName("PRIMARY");

            entity
                .HasCharSet("utf8mb3")
                .UseCollation("utf8mb3_general_ci");

            entity.HasIndex(e => e.IdUser, "fk_Tasks_UserInfo1_idx");
            entity.Property(e => e.IdStatus).HasDefaultValueSql("'1'");

            entity.Property(e => e.DateOfIssue).HasColumnType("datetime");
            entity.Property(e => e.Deadline).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Title).HasMaxLength(100);

            entity.HasOne(d => d.IdStatusNavigation).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.IdStatus)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Tasks_Status1");
            
            entity.HasOne(d => d.IdUserNavigation).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.IdUser)
                .HasConstraintName("fk_Tasks_UserInfo1");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.IdUser).HasName("PRIMARY");

            entity
                .HasCharSet("utf8mb3")
                .UseCollation("utf8mb3_general_ci");

            entity.HasIndex(e => e.Login, "Login_UNIQUE").IsUnique();

            entity.HasIndex(e => e.IdRole, "fk_Users_Roles1_idx");

            entity.Property(e => e.Login).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(500);

            entity.HasOne(d => d.IdRoleNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.IdRole)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_Users_Roles1");
        });

        modelBuilder.Entity<UserInfo>(entity =>
        {
            entity.HasKey(e => e.IdUser).HasName("PRIMARY");

            entity
                .ToTable("UserInfo")
                .HasCharSet("utf8mb3")
                .UseCollation("utf8mb3_general_ci");

            entity.HasIndex(e => e.Email, "Email_UNIQUE").IsUnique();

            entity.HasIndex(e => e.Phone, "Phone_UNIQUE").IsUnique();

            entity.HasIndex(e => new { e.Surname, Firstname = e.Name, e.Patronymic }, "Surname_Firstname_Patronymic_UNIQUE").IsUnique();

            entity.Property(e => e.IdUser).ValueGeneratedNever();
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Patronymic).HasMaxLength(50);
            entity.Property(e => e.Phone).HasMaxLength(50);
            entity.Property(e => e.Surname).HasMaxLength(50);

            entity.HasOne(d => d.IdUserNavigation).WithOne(p => p.UserInfo)
                .HasForeignKey<UserInfo>(d => d.IdUser)
                .HasConstraintName("fk_UserInfo_Users");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
