using PlatformApi.Models;
using System.Security.Claims;

namespace PlatformApi.Services;

public class UserService : IUserService
{
    private readonly PlatformContext _platformContext;
    private readonly IUserInfoService _userInfoService;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserService(PlatformContext platformContext, IHttpContextAccessor httpContextAccessor, IUserInfoService userInfoService)
    {
        _platformContext = platformContext;
        _httpContextAccessor = httpContextAccessor;
        _userInfoService = userInfoService;
    }

    public async Task<List<User>?> GetUsers() 
        => await _platformContext.Users.Include(user => user.UserInfo).ToListAsync();

    public async Task<User?> GetUserByLogin(string login) 
        => await _platformContext.Users.Include(user => user.UserInfo).FirstOrDefaultAsync(user => user.Login == login);

    public async Task<User?> GetByJwtAuth()
    {
        if (_httpContextAccessor.HttpContext is null) throw new Exception("неизвестная ошибка");
            
        var id = _httpContextAccessor.HttpContext.User.FindFirstValue("id");
                
        if (id is null) throw new Exception("Идентификатор пользователя не найден! Пожалуйста авторизуйтесь заново");
                
        var user = await _platformContext.Users.Include(user => user.UserInfo).FirstOrDefaultAsync(user => user.IdUser == int.Parse(id));
                
        if (user is null) throw new Exception("Пользователь не найден");

        return user;
    }
    
    public async Task<User?> GetByUserId(int id) =>
        await _platformContext.Users.Include(user => user.UserInfo).FirstOrDefaultAsync(user => user.IdUser == id);

    public async Task<User?> CreateUser(UserDto userDto)
    {
        var password = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
        
        var user = new User
        {
            Login = userDto.Login,
            Password = password,
            IdRole = userDto.IdRole
        };
        
        await _platformContext.Users.AddAsync(user);

        await Save();

        return await GetUserByLogin(userDto.Login);
    }
    
    public static void ValidateUser(User? user)
    {
        if (user == null) 
            throw new Exception("Пользователь не найден");

        if (user.UserInfo == null) 
            throw new Exception("Пользовательская информация не найдена");
    }

    public async Task<User?> UpdateUser(int id, UpdateUserDto updateUserDto)
    {
        var user = await GetByUserId(id);
        
        ValidateUser(user);

        if (updateUserDto.Login != null)
        {
            if (await GetUserByLogin(updateUserDto.Login) != null) 
                throw new Exception("Пользователь с таким логином уже существует");
            user.Login = updateUserDto.Login;
        }
           
        if (updateUserDto.Email != null)
        {
            if (await _userInfoService.GetUserInfoByCondition(user => user.Email == updateUserDto.Email) != null)
                throw new Exception("Пользователь с такой почтой уже существует");
            user.UserInfo.Email = updateUserDto.Email;
        }

        if (updateUserDto.Phone != null)
        {
            if (await _userInfoService.GetUserInfoByCondition(user => user.Phone == updateUserDto.Phone) != null)
                throw new Exception("Пользователь с таким номером телефона уже существует");
            user.UserInfo.Phone = updateUserDto.Phone;
        }

        await Save();
        
        return user;
    }

    public async Task<User?> UpdateUserPassword(int id, UpdateUserPasswordDto updateUserPasswordDto)
    {
        var user = await GetByUserId(id);
        
        if (user == null) throw new Exception("Пользователь не найден");
        
        if (!BCrypt.Net.BCrypt.Verify(updateUserPasswordDto.OldPassword, user.Password))
            throw new Exception("Неверный пароль");
        
        user.Password = BCrypt.Net.BCrypt.HashPassword(updateUserPasswordDto.NewPassword);
        
        await Save();
        
        return user;
    }

    public async Task<User?> DeleteUser(int id)
    {
        var user = await GetByUserId(id);
        if (user == null) return null;

        _platformContext.Remove(user);

        await Save();
        
        return user;
    }

    private async Task Save() => await _platformContext.SaveChangesAsync();
}