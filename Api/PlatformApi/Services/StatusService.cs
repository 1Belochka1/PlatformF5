using System.Security.Claims;

namespace PlatformApi.Services;

public class StatusService : IStatusService
{
    private readonly PlatformContext _platformContext;

    public StatusService(PlatformContext platformContext)
    {
        _platformContext = platformContext;
    }


    public async Task<List<Status>> GetAllStatus()
    {
        var statuses = await _platformContext.Statuses.ToListAsync();
        if (statuses.Count > 0)
        {
            return statuses;
        }
        throw new Exception("Статусы заданий отсутствуют");

    }
}