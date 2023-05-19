using System.Security.Claims;

namespace PlatformApi.Services;

public class TasksService : ITasksService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly PlatformContext _platformContext;

    public TasksService(PlatformContext platformContext, IHttpContextAccessor httpContextAccessor)
    {
        _platformContext = platformContext;
        _httpContextAccessor = httpContextAccessor;
    }

    /// <summary>
    ///     Получает все задаиня.
    /// </summary>
    /// <returns>Список заданий.</returns>
    public async Task<List<Tasks>> GetAllTasks()
    {
        var tasks = await _platformContext.Tasks.Include(task => task.IdStatusNavigation).ToListAsync();

        if (tasks is null) throw new ArgumentNullException("Задания не найдены");

        return tasks;
    }

    /// <summary>
    ///     Получает доступные задания.
    /// </summary>
    /// <returns>Список доступных заданий.</returns>
    public async Task<List<Tasks>> GetTasksNoUsers()
    {
        var tasks = await _platformContext.Tasks
            .Include(task => task.IdStatusNavigation)
            .Where(task => task.IdUser == null)
            .ToListAsync();

        if (tasks is null) throw new ArgumentNullException("Задания не найдены");

        return tasks;
    }

    /// <summary>
    ///     Получает выполнненые задаиня авторизованного пользователя.
    /// </summary>
    /// <returns>Список выполнненых заданий пользователя.</returns>
    public async Task<List<Tasks>> GetTasksCompletedByUserId()
    {
        if (_httpContextAccessor.HttpContext is null) throw new ArgumentNullException("неизвестная ошибка");

        var id = _httpContextAccessor.HttpContext.User.FindFirstValue("id");

        if (id is null)
            throw new ArgumentNullException("Идентификатор пользователя не найден! Пожалуйста авторизуйтесь заново");

        var tasks = await _platformContext.Tasks
            .Include(task => task.IdStatusNavigation)
            .Where(task => task.IdUser == int.Parse(id))
            .Where(task => task.IdStatus == 3)
            .ToListAsync();

        if (tasks is null) throw new ArgumentNullException("Задания не найдены");

        return tasks;
    }

    /// <summary>
    ///     Получает пользователя по указанному идентификатору.
    /// </summary>
    /// <param name="id">Идентификатор задания.</param>
    /// <returns>Объект пользователя.</returns>
    /// <exception cref="ArgumentNullException">Если пользователь не найден.</exception>
    public async Task<Tasks?> GetById(int id)
    {
        return await _platformContext.Tasks.FirstOrDefaultAsync(t => t.IdTasks == id) ??
               throw new ArgumentNullException("Задание не найдено");
    }

    /// <summary>
    ///     Получает текущие задаиня авторизованного пользователя.
    /// </summary>
    /// <returns>Список заданий пользователя.</returns>
    public async Task<List<Tasks>> GetAllTaskByUserId()
    {
        if (_httpContextAccessor.HttpContext is null) throw new Exception("неизвестная ошибка");

        var id = _httpContextAccessor.HttpContext.User.FindFirstValue("id");

        if (id is null)
            throw new ArgumentNullException("Идентификатор пользователя не найден! Пожалуйста авторизуйтесь заново");

        var tasks = await _platformContext.Tasks
            .Include(task => task.IdStatusNavigation)
            .Where(task => task.IdUser == int.Parse(id))
            .ToListAsync();

        if (tasks is null) throw new ArgumentNullException("Задания не найдены");

        return tasks;
    }

    /// <summary>
    ///     Получает пользователя по указанному идентификатору.
    /// </summary>
    /// <param name="tasksDto">Data Transfer Object для создания задания.</param>
    public async Task CreateTask(CreateTasksDto tasksDto)
    {
        if (tasksDto.IdUser != null &&
            await _platformContext.Users.FirstOrDefaultAsync(user => user.IdUser == tasksDto.IdUser) == null)
            throw new ArgumentNullException("Данного пользователя не существует");
        var newTask = new Tasks
        {
            Title = tasksDto.Title,
            Description = tasksDto.Description,
            DateOfIssue = DateTime.Now,
            Deadline = tasksDto.Deadline,
            IdStatus = tasksDto.IdUser != null ? 2 : 1,
            IdUser = tasksDto.IdUser
        };
        await _platformContext.Tasks.AddAsync(newTask);

        await Save();
    }

    /// <summary>
    ///     Обновляет задание по указанному идентификатору.
    /// </summary>
    /// <param name="id">Идентификатор задаиня.</param>
    /// <param name="tasksDto">Data Transfer Object для обновления задания.</param>
    /// <returns>Обновленное задание</returns>
    public async Task<Tasks?> UpdateTask(int id, UpdateTasksDto taskUpdate)
    {
        var task = await _platformContext.Tasks.FirstOrDefaultAsync(t => t.IdTasks == id);

        if (task == null)
            throw new ArgumentNullException("Задание не найдено");

        if (taskUpdate.Description != null)
            task.Description = taskUpdate.Description;

        if (taskUpdate.Deadline != null)
            task.Deadline = (DateTime)taskUpdate.Deadline;

        if (taskUpdate.IdStatus != null)
            task.IdStatus = (int)taskUpdate.IdStatus;

        task.IdUser = taskUpdate.IdUsers;

        await Save();

        return task;
    }

    /// <summary>
    ///     Удаляет задание по указанному идентификатору.
    /// </summary>
    /// <param name="id">Идентификатор задаиня.</param>
    /// <returns>Удаленное задание</returns>
    public async Task<Tasks?> Delete(int id)
    {
        var task = await _platformContext.Tasks.FirstOrDefaultAsync(t => t.IdTasks == id);

        if (task == null)
            throw new ArgumentNullException("Задание не найдено");

        _platformContext.Tasks.Remove(task);

        await Save();

        return task;
    }

    /// <summary>
    ///     Сохраняет изменения.
    /// </summary>
    private async Task Save()
    {
        await _platformContext.SaveChangesAsync();
    }
}