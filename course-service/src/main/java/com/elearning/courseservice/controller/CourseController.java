package com.elearning.courseservice.controller;

import com.elearning.courseservice.dto.CourseRequestDto;
import com.elearning.courseservice.dto.CourseResponseDto;
import com.elearning.courseservice.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping
    public CourseResponseDto createCourse(
            @Valid @RequestBody CourseRequestDto dto
    ) {

        return courseService.createCourse(dto);
    }

    @GetMapping
    public List<CourseResponseDto> getAllCourses() {

        return courseService.getAllCourses();
    }
    @PutMapping("/{id}/decrement")
    public void decrementEnrollment(
            @PathVariable Long id
    ) {

        courseService.decrementEnrollment(id);
    }
    @GetMapping("/recent")
    public List<CourseResponseDto> getRecentCourses() {

        return courseService.getRecentCourses();
    }

    @GetMapping("/{id}")
    public CourseResponseDto getCourseById(
            @PathVariable Long id
    ) {

        return courseService.getCourseById(id);
    }

    @PutMapping("/{id}/increment")
    public void incrementEnrollment(
            @PathVariable Long id
    ) {

        courseService.incrementEnrollment(id);
    }
}