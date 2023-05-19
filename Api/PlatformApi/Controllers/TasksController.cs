using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PlatformApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly IServicesManager _services;

    public TasksController(IServicesManager services)
    {
        _services = services;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<Tasks>>> GetAllTasks()
    {
        try
        {
            var tasks = await _services.Tasks.GetAllTasks();

            return Ok(tasks);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("GetAllTasksByJwtAuth")]
    [Authorize]
    public async Task<ActionResult<List<Tasks>?>> GetAllTasksByUserId()
    {
        try
        {
            var task = await _services.Tasks.GetAllTaskByUserId();

            return Ok(task);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("GetTasksNoUsers")]
    [Authorize]
    public async Task<ActionResult<List<Tasks>?>> GetTasksNoUsers()
    {
        try
        {
            return Ok(await _services.Tasks.GetTasksNoUsers());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("GetTasksCompletedByUserId")]
    [Authorize]
    public async Task<ActionResult<List<Tasks>?>> GetTasksCompletedByUserId()
    {
        try
        {
            return Ok(await _services.Tasks.GetTasksCompletedByUserId());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("GetTaskById/{id}")]
    [Authorize]
    public async Task<ActionResult<List<Tasks>?>> GetTaskById(int id)
    {
        try
        {
            var task = await _services.Tasks.GetById(id);

            return Ok(task);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Tasks?>> CreateTask(CreateTasksDto request)
    {
        try
        {
            await _services.Tasks.CreateTask(request);

            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<Tasks>> UpdateTask(int id, UpdateTasksDto request)
    {
        try
        {
            var task = await _services.Tasks.UpdateTask(id, request);

            return Ok(task);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult<Tasks>> DeleteTask(int id)
    {
        try
        {
            var task = await _services.Tasks.Delete(id);

            return Ok(task);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}