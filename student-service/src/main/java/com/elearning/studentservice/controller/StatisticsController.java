package com.elearning.studentservice.controller;

import com.elearning.studentservice.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StatisticsController {

    private final StudentRepository
            studentRepository;

    @GetMapping("/count")
    public long getTotalStudents() {

        return studentRepository.count();
    }
}