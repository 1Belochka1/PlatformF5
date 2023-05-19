using System;
using System.Collections.Generic;

namespace PlatformApi.Models;

public partial class Tasks
{
    public int IdTasks { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime DateOfIssue { get; set; }

    public DateTime Deadline { get; set; }
    
    public int IdStatus { get; set; }

    public int? IdUser { get; set; }
    
    public virtual Status IdStatusNavigation { get; set; } = null!;


    public virtual UserInfo IdUserNavigation { get; set; } = null!;
}
