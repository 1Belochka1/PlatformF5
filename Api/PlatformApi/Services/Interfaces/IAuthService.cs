using Microsoft.AspNetCore.Mvc;

namespace PlatformApi.Services.Interfaces;

public interface IAuthService
{
    Task<User?> Register(CreateUserDto createUserDto);
    Task<ResponseLoginAuthDto> Login(RequestLoginAuthDto requestLoginAuthDto);
}