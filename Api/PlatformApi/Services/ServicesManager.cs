namespace PlatformApi.Services
{
    public class ServicesManager : IServicesManager
    {
        private readonly PlatformContext _platformContext;
        private ITasksService _tasksServices;
        private IUserService _userService;
        private IUserInfoService _userInfoService;
        private IAuthService _authService;        
        private IStatusService _statusService;

        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ServicesManager(PlatformContext platformContext, IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _platformContext = platformContext;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public ITasksService Tasks
        {
            get { 
                if (_tasksServices == null) 
                    _tasksServices = new TasksService(_platformContext, _httpContextAccessor);
                return _tasksServices;
            }
        }
        
        public IUserService Users
        {
            get { 
                if (_userService == null) 
                    _userService = new UserService(_platformContext,_httpContextAccessor,_userInfoService);
                return _userService;
            }
        }

        public IUserInfoService UsersInfo
        {
            get
            {
                if (_userInfoService == null) 
                    _userInfoService = new UserInfoService(_platformContext);
                return _userInfoService;
            }
        }

        public IAuthService Auth
        {
            get
            {
                if (_authService == null) 
                    _authService = new AuthService(Users, UsersInfo, _configuration);
                return _authService;
            }
        }
        
        public IStatusService Statuses
        {
            get
            {
                if (_statusService == null) 
                    _statusService = new StatusService(_platformContext);
                return _statusService;
            }
        }

    }
}
