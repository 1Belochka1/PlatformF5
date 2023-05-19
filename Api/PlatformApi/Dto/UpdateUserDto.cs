namespace PlatformApi.Dto;

public class UpdateUserDto
{
    public string? Login { get; set; } = null!;
    
    public string? Email { get; set; } = null!;

    public string? Phone { get; set; } = null!;
}