using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace PlatformApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IServicesManager _services;

    public AuthController(IServicesManager services)
    {
        _services = services;
    }


    [HttpPost("Register")]
    public async Task<ActionResult<User?>> Register(CreateUserDto createUserDto)
    {
        try
        {
            var user = await _services.Auth.Register(createUserDto);
            return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost("Login")]
    public async Task<ActionResult<ResponseLoginAuthDto?>> Login(RequestLoginAuthDto requestLoginAuthDto)
    {
        try
        {
            var user = await _services.Auth.Login(requestLoginAuthDto);
            return Ok(user);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}