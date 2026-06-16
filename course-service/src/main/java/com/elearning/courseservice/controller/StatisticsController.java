package com.elearning.courseservice.controller;

import com.elearning.courseservice.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class StatisticsController {

    private final CourseRepository
            courseRepository;

    @GetMapping("/count")
    public long getTotalCourses() {

        return courseRepository.count();
    }
}