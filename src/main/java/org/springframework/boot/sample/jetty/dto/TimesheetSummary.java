package org.springframework.boot.sample.jetty.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TimesheetSummary {

    public Date start;
    public Date end;
    public List<ProjectSummary> projects = new ArrayList<ProjectSummary>();
    
}
