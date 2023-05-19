using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PlatformApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StatusController : ControllerBase
{
    private readonly IServicesManager _services;

    public StatusController(IServicesManager services)
    {
        _services = services;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<Status>>> GetStatus()
    {
        try
        {
            return Ok(await _services.Statuses.GetAllStatus());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}