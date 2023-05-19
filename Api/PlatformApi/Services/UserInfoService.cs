using System.Linq.Expressions;

namespace PlatformApi.Services;

public class UserInfoService : IUserInfoService
{
    private readonly PlatformContext _platformContext;

    public UserInfoService(PlatformContext platformContext)
    {
        _platformContext = platformContext;
    }


    public async Task<UserInfo?> GetUserInfoById(int id) => await _platformContext.UserInfos.FirstOrDefaultAsync(user => user.IdUser == id);
    
    public async Task<UserInfo?> GetUserInfoByCondition(Expression<Func<UserInfo, bool>> condition) => await _platformContext.UserInfos.FirstOrDefaultAsync(condition);
    
    public async Task CreateUserInfo(int id, UserInfoDto user)
    {
        var userInfo = new UserInfo
        {
            IdUser = id,
            Surname = user.Surname,
            Name = user.Name,
            Patronymic = user.Patronymic,
            Email = user.Email,
            Phone = user.Phone
        };

        await _platformContext.UserInfos.AddAsync(userInfo);

        await Save();
    }
    
    private async Task Save() => await _platformContext.SaveChangesAsync();

}