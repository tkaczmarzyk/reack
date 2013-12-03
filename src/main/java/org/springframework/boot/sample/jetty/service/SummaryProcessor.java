package org.springframework.boot.sample.jetty.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.sample.jetty.dto.ProjectCode;
import org.springframework.boot.sample.jetty.dto.beebole.Company;
import org.springframework.boot.sample.jetty.dto.beebole.EntitiesResponse;
import org.springframework.boot.sample.jetty.dto.beebole.Project;
import org.springframework.boot.sample.jetty.dto.beebole.TimeEntriesResponse;
import org.springframework.boot.sample.jetty.dto.beebole.TimeEntry;
import org.springframework.stereotype.Component;

@Component
public class SummaryProcessor {

    public Map<ProjectCode,BigDecimal> generateSummary(TimeEntriesResponse timeEntries, EntitiesResponse entities){
        processEntities(entities);
        return processTimeEntries(timeEntries);
    }
    
    private Map<ProjectCode,BigDecimal> processTimeEntries(TimeEntriesResponse entries) {
        Map<ProjectCode, BigDecimal> summary = new HashMap<ProjectCode, BigDecimal>();
        if (entries != null && entries.status.equals("ok")) {
            for (TimeEntry entry : entries.timeEntries) {
                BigDecimal hoursToAdd = entry.hours;
                ProjectCode code = null;
                if (entry.subproject != null) {
                    code = subprojects.get(entry.subproject.id);
                }
                if (entry.project != null) {
                    code = projects.get(entry.project.id);
                }

                BigDecimal currentHours = BigDecimal.ZERO;
                if (summary.containsKey(code)) {
                    currentHours = summary.get(code);
                }

                summary.put(code, currentHours.add(hoursToAdd));
            }
        }
        return summary;
    }
    
    private void processEntities(EntitiesResponse res) {
        if (res != null && res.status.equals("ok")) {
            for (Company company : res.companies) {
                for (Project proj : company.projects) {
                    for (Project subproj : proj.subprojects) {
                        ProjectCode code = new ProjectCode();
                        code.companyName = company.name;
                        code.projectName = proj.name;
                        subprojects.put(subproj.id, code);
                    }
                    ProjectCode code = new ProjectCode();
                    code.companyName = company.name;
                    code.projectName = proj.name;
                    projects.put(proj.id, code);
                }
            }
        }
    }

    private Map<Integer, ProjectCode> projects = new HashMap<Integer, ProjectCode>();
    private Map<Integer, ProjectCode> subprojects = new HashMap<Integer, ProjectCode>();
    
}
