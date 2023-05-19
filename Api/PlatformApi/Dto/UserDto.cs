using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace PlatformApi.Dto;

public class UserDto
{
    public string Login { get; set; } = null!;

    public string Password { get; set; } = null!;

    [DefaultValue(3)]
    public int IdRole { get; set; } 
}