namespace PlatformApi.Services.Interfaces;

public interface ITasksService
{
    Task<List<Tasks>> GetAllTasks();
    Task<List<Tasks>> GetTasksNoUsers();
    Task<List<Tasks>> GetTasksCompletedByUserId();
    Task<Tasks?> GetById(int id);
    Task<List<Tasks>> GetAllTaskByUserId();
    Task CreateTask(CreateTasksDto tasksDto);
    Task<Tasks?> UpdateTask(int id, UpdateTasksDto task);
    Task<Tasks?> Delete(int id);
}