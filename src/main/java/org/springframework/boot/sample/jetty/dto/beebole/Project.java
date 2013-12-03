package org.springframework.boot.sample.jetty.dto.beebole;

public class Project {

    public Integer id;
    public String name;
    public Project[] subprojects = new Project[]{};
    
}
