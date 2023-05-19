using System.IdentityModel.Tokens.Jwt;
using System.Runtime.InteropServices.ComTypes;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace PlatformApi.Services;

public class AuthService : IAuthService
{
    private readonly IUserService _userService;
    private readonly IUserInfoService _userInfoService;
    private readonly IConfiguration _configuration;

    public AuthService(IUserService userService, IUserInfoService userInfoService, IConfiguration configuration)
    {
        _userService = userService;
        _userInfoService = userInfoService;
        _configuration = configuration;
    }
    
    public async Task<User?> Register(CreateUserDto createUserDto)
    {
        if (await _userService.GetUserByLogin(createUserDto.User.Login) != null) 
            throw new Exception("Пользователь с таким логином уже существует");
        
        if (await _userInfoService.GetUserInfoByCondition(user => user.Phone == createUserDto.UserInfo.Phone) != null)
            throw new Exception("Пользователь с таким номером телефона уже существует");
        
        if (await _userInfoService.GetUserInfoByCondition(user => user.Email == createUserDto.UserInfo.Email) != null)
            throw new Exception("Пользователь с такой почтой уже существует");
        
        var user = await _userService.CreateUser(createUserDto.User);

        await  _userInfoService.CreateUserInfo(user.IdUser, createUserDto.UserInfo);

        return await _userService.GetUserByLogin(createUserDto.User.Login);
    }

    public async Task<ResponseLoginAuthDto> Login(RequestLoginAuthDto requestLoginAuthDto)
    {
        var user = await _userService.GetUserByLogin(requestLoginAuthDto.Login);
        
        if (user == null) 
            throw new Exception("Пользователя с таким логином не существует");

        if (!BCrypt.Net.BCrypt.Verify(requestLoginAuthDto.Password, user.Password))
            throw new Exception("Неверный пароль");

        var token = CreateToken(user);

        var response = new ResponseLoginAuthDto
        {
            IdUser = user.IdUser,
            Login = user.Login,
            IdRole = user.IdRole,
            Token = token
        };

        return response;
    }

    private string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new("Id", $"{ user.IdUser }"),
            new(ClaimTypes.Name, user.Login),
            new(ClaimTypes.Role, $"{ user.IdRole }")
        };
        
        var key = new SymmetricSecurityKey(
            Convert.FromBase64String(_configuration.GetSection("Authentication:Schemes:Bearer:SigningKeys:0:Value").Value!));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(30),
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }

}