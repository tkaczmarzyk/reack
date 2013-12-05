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

package org.springframework.boot.sample.jetty.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.sample.jetty.dto.MonthlySummaryRequest;
import org.springframework.boot.sample.jetty.dto.SummaryRequest;
import org.springframework.boot.sample.jetty.service.BeeboleService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class TimesheetController {

    private static final Logger logger = LoggerFactory.getLogger(TimesheetController.class);

    @Autowired
    private BeeboleService beeboleService;

    @RequestMapping(value = "/monthSummary", method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public String monthSummary(@RequestBody MonthlySummaryRequest request) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        logger.error("request beebole:{}, month:{}, year:{}", new Object[] { request.beeboleToken, request.month,
                request.year });
        return mapper.writeValueAsString(beeboleService.getMonthSummary(request.beeboleToken, request.month,
                request.year));
    }
    
    @RequestMapping(value = "/summary", method = { RequestMethod.POST }, consumes = { "application/json" })
    @ResponseBody
    public String summary(@RequestBody SummaryRequest request) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        logger.error("request beebole:{}, startDate:{}, endDate:{}", new Object[] { request.beeboleToken, request.start,
                request.end });
        return mapper.writeValueAsString(beeboleService.getSummary(request.beeboleToken, request.start,
                request.end));
    }
}
