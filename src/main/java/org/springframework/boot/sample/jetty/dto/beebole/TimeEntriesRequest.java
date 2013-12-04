package org.springframework.boot.sample.jetty.dto.beebole;

public class TimeEntriesRequest {

    public String service = "time_entry.list";
    public String from;
    public String to;
    
    @Override
    public String toString() {
        return "TimeEntriesRequest [service=" + service + ", from=" + from + ", to=" + to + "]";
    }
    
}
