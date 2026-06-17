package com.elearning.enrollmentservice.client;

import com.elearning.enrollmentservice.dto.CourseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "COURSE-SERVICE")
public interface CourseClient {

    @GetMapping("/api/courses/{id}")
    CourseDto getCourseById(
            @PathVariable Long id
    );

    @PutMapping("/api/courses/{id}/increment")
    void incrementEnrollment(
            @PathVariable Long id
    );

    @PutMapping("/api/courses/{id}/decrement")
    void decrementEnrollment(
            @PathVariable Long id
    );
}