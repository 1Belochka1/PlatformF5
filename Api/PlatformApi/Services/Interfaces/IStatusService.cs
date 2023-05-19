namespace PlatformApi.Services.Interfaces;

public interface IStatusService
{
    Task<List<Status>> GetAllStatus();
}