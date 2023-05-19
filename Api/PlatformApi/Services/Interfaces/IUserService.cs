namespace PlatformApi.Services.Interfaces;

public interface IUserService
{
    Task<List<User>?> GetUsers();
    Task<User?> GetByJwtAuth();

    Task<User?> GetUserByLogin(string login);
    Task<User?> GetByUserId(int id);
    Task<User?> CreateUser(UserDto user);
    Task<User?> UpdateUser(int id, UpdateUserDto updateUserDto);
    Task<User?> UpdateUserPassword(int id, UpdateUserPasswordDto updateUserPasswordDto);
    Task<User?> DeleteUser(int id);
}