namespace PlatformApi.Dto;

public class UpdateTasksDto
{
    public string? Description { get; set; }
    public DateTime? Deadline { get; set; }
    public int? IdStatus { get; set; }
    public int? IdUsers { get; set; }
}