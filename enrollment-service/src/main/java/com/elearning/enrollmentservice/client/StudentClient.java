package com.elearning.enrollmentservice.client;

import com.elearning.enrollmentservice.dto.StudentDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "STUDENT-SERVICE")
public interface StudentClient {

    @GetMapping("/api/students/{id}")
    StudentDto getStudentById(@PathVariable Long id);
}