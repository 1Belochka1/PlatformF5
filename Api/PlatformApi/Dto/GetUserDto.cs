namespace PlatformApi.Dto;

public class GetUserDto
{
    public int IdUser { get; set; }
    
    public string Login { get; set; } = null!;

    public int IdRole { get; set; }
}