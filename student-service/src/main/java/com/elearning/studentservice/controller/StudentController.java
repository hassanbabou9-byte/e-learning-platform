package com.elearning.studentservice.controller;

import com.elearning.studentservice.dto.LoginRequest;
import com.elearning.studentservice.dto.LoginResponse;
import com.elearning.studentservice.dto.StudentRequestDto;
import com.elearning.studentservice.dto.StudentResponseDto;
import com.elearning.studentservice.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ) {
        return studentService.login(request);
    }
    @PostMapping("/register")
    public StudentResponseDto registerStudent(
            @Valid @RequestBody StudentRequestDto dto
    ) {
        return studentService.registerStudent(dto);
    }

    @GetMapping
    public List<StudentResponseDto> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public StudentResponseDto getStudentById(
            @PathVariable Long id
    ) {
        return studentService.getStudentById(id);
    }
}