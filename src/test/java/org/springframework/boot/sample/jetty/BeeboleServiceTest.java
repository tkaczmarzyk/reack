package org.springframework.boot.sample.jetty;

import static org.junit.Assert.assertEquals;

import java.io.FileReader;
import java.math.BigDecimal;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.junit.Before;
import org.junit.Test;
import org.springframework.boot.sample.jetty.dto.ProjectCode;
import org.springframework.boot.sample.jetty.dto.beebole.EntitiesResponse;
import org.springframework.boot.sample.jetty.dto.beebole.TimeEntriesResponse;
import org.springframework.boot.sample.jetty.service.SummaryProcessor;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

public class BeeboleServiceTest {

    ObjectMapper mapper;
    
    SummaryProcessor testObj;
    
    @Before
    public void setup() {
        mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        testObj = new SummaryProcessor();
    }
    
    @Test
    public void testJsonProcessing() throws Exception {
        FileReader entitiesReader = new FileReader("src/test/resources/entities2.js");
        FileReader timeEntriesReader = new FileReader("src/test/resources/entries.js");
        
        String entities = IOUtils.toString(entitiesReader);
        String timeEntries = IOUtils.toString(timeEntriesReader);

        EntitiesResponse entitiesDto = mapper.readValue(entities, EntitiesResponse.class);
        TimeEntriesResponse entriesDto = mapper.readValue(timeEntries, TimeEntriesResponse.class);

        Map<ProjectCode, BigDecimal> summary = testObj.generateSummary(entriesDto, entitiesDto);

        ProjectCode cohesivaCurrent = new ProjectCode();
        cohesivaCurrent.companyName = "Cohesiva";
        cohesivaCurrent.projectName = "Current";
        
        ProjectCode nomtekSpider = new ProjectCode();
        nomtekSpider.companyName = "Nomtek";
        nomtekSpider.projectName = "Spider";
        
        assertEquals(new BigDecimal("64.0"),summary.get(cohesivaCurrent));
        assertEquals(new BigDecimal("88.0"),summary.get(nomtekSpider));
    }

}
