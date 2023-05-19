namespace PlatformApi.Dto;

public class CreateTasksDto
{
    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime Deadline { get; set; }
    
    public int? IdUser { get; set; }
}