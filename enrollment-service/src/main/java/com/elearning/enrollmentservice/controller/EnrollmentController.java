package com.elearning.enrollmentservice.controller;

import com.elearning.enrollmentservice.dto.EnrollmentRequestDto;
import com.elearning.enrollmentservice.entity.Enrollment;
import com.elearning.enrollmentservice.repository.EnrollmentRepository;
import com.elearning.enrollmentservice.service.EnrollmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService
            enrollmentService;

    private final EnrollmentRepository
            enrollmentRepository;

    @PostMapping
    public Enrollment enrollStudent(
            @Valid @RequestBody EnrollmentRequestDto request
    ) {

        return enrollmentService.enrollStudent(
                request.getStudentId(),
                request.getCourseId()
        );
    }

    @GetMapping("/count")
    public long getTotalEnrollments() {

        return enrollmentRepository.count();
    }
}