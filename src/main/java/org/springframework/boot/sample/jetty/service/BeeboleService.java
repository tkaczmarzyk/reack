/*
 * Copyright 2012-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.springframework.boot.sample.jetty.service;

import java.math.BigDecimal;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.sample.jetty.dto.ProjectCode;
import org.springframework.boot.sample.jetty.dto.ProjectSummary;
import org.springframework.boot.sample.jetty.dto.TimesheetMonthlySummary;
import org.springframework.boot.sample.jetty.dto.beebole.EntitiesRequest;
import org.springframework.boot.sample.jetty.dto.beebole.EntitiesResponse;
import org.springframework.boot.sample.jetty.dto.beebole.TimeEntriesRequest;
import org.springframework.boot.sample.jetty.dto.beebole.TimeEntriesResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class BeeboleService {

    private static final Logger logger = LoggerFactory.getLogger(BeeboleService.class);

    @Value("${beeboleUrl:https://cohesiva.beebole-apps.com/api}")
    private String url;

    private ObjectMapper mapper;

    @Autowired
    private SummaryProcessor processor;

    @PostConstruct
    private void initObjectMapper() {
        mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    public TimesheetMonthlySummary getMonthSummary(String beeboleToken, Integer month, Integer year) throws Exception {
        EntitiesResponse entities = getEntities(beeboleToken);
        TimeEntriesResponse timeEntries = getTimeEntries(beeboleToken, month, year);

        Map<ProjectCode, BigDecimal> summary = processor.generateSummary(timeEntries, entities);

        TimesheetMonthlySummary result = new TimesheetMonthlySummary();
        for (ProjectCode code : summary.keySet()) {
            ProjectSummary projsum = new ProjectSummary();
            projsum.projectCode = code.getProjectCode();
            projsum.timeWorked = summary.get(code);
            result.projects.add(projsum);
        }
        return result;
    }

    private TimeEntriesResponse getTimeEntries(String beeboleToken, Integer month, Integer year) throws Exception {

        HttpHeaders httpHeaders = createBasicAuthHeaders(beeboleToken);

        RestTemplate tmp = new RestTemplate();

        TimeEntriesRequest request = new TimeEntriesRequest();
        request.from = getFromDate(month, year);
        request.to = getToDate(month, year);

        String response = tmp.exchange(url, HttpMethod.POST, new HttpEntity(request, httpHeaders), String.class)
                .getBody();
        logger.debug("getTimeEntries, Response: {}", response);

        return mapper.readValue(response, TimeEntriesResponse.class);
    }

    private HttpHeaders createBasicAuthHeaders(String beeboleToken) {
        HttpHeaders httpHeaders = new HttpHeaders();
        // Basic Authentication
        String authorisation = beeboleToken + ":" + "x";
        byte[] encodedAuthorisation = Base64.encodeBase64(authorisation.getBytes());
        httpHeaders.add("Authorization", "Basic " + new String(encodedAuthorisation));
        return httpHeaders;
    }

    private String getToDate(Integer month, Integer year) {
        return "2013-11-30";
    }

    private String getFromDate(Integer month, Integer year) {
        return "2013-11-01";
    }

    private EntitiesResponse getEntities(String beeboleToken) throws Exception {
        RestTemplate tmp = new RestTemplate();

        HttpHeaders httpHeaders = createBasicAuthHeaders(beeboleToken);

        EntitiesRequest request = new EntitiesRequest();

        String response = tmp.exchange(url, HttpMethod.POST, new HttpEntity(request, httpHeaders), String.class)
                .getBody();
        logger.debug("getEntities, Response {}", response);

        return mapper.readValue(response, EntitiesResponse.class);
    }

}
