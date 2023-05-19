using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PlatformApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    IServicesManager _services;

    public UsersController(IServicesManager services)
    {
        _services = services;
    }

    [HttpGet, Authorize]
    public async Task<ActionResult<List<User>?>> GetUsers() => await _services.Users.GetUsers();
    
    [HttpGet("{id}"), Authorize(Roles = "1")]
    public async Task<ActionResult<User?>> GetUserById(int id) => await _services.Users.GetByUserId(id);

    [HttpGet("GetUserByJwtAuth"), Authorize]
    public async Task<ActionResult<User?>> GetUserByJwtAuth()
    {
        try
        {
            return Ok(await _services.Users.GetByJwtAuth());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("{id}"), Authorize]
    public async Task<ActionResult> UpdateUser(int id, UpdateUserDto updateUserDto)
    {
        try
        {
            return Ok(await _services.Users.UpdateUser(id, updateUserDto));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPut("UpdatePasswordUser/{id}"), Authorize]
    public async Task<ActionResult> UpdatePasswordUser(int id, UpdateUserPasswordDto updateUserPasswordDto)
    {
        try
        {
            return Ok(await _services.Users.UpdateUserPassword(id, updateUserPasswordDto));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpDelete("{id}"), Authorize(Roles = "1")]
    public async Task<ActionResult> DeleteUser(int id)
    {
        try
        {
            return Ok(await _services.Users.DeleteUser(id));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}