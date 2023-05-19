namespace PlatformApi.Services.Interfaces
{
    public interface IServicesManager
    {
        ITasksService Tasks { get; }
        IUserService Users { get; }
        IUserInfoService UsersInfo { get; }
        IAuthService Auth { get; }

        IStatusService Statuses { get; }

    }
}
