using System.Linq.Expressions;

namespace PlatformApi.Services.Interfaces;

public interface IUserInfoService
{
    Task<UserInfo?> GetUserInfoById(int id);
    Task<UserInfo?> GetUserInfoByCondition(Expression<Func<UserInfo, bool>> condition);
    Task CreateUserInfo(int id, UserInfoDto user);
}