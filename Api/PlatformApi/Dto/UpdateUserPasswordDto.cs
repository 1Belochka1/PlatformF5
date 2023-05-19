namespace PlatformApi.Dto;

public class UpdateUserPasswordDto
{
    public string OldPassword { get; set; } = null!;
    public string NewPassword { get; set; } = null!;
}