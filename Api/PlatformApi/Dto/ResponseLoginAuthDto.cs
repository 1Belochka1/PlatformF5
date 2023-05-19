namespace PlatformApi.Dto;

public class ResponseLoginAuthDto
{
    public int IdUser { get; set; }

    public string Login { get; set; } = null!;
    
    public int IdRole { get; set; }

    public string Token { get; set; }
}