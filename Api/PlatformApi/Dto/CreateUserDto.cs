namespace PlatformApi.Dto;

public class CreateUserDto
{
    public UserDto User { get; set; } = null!;
    public UserInfoDto UserInfo { get; set; } = null!;
}