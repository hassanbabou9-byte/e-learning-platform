package com.elearning.enrollmentservice.service;

import com.elearning.enrollmentservice.client.CourseClient;
import com.elearning.enrollmentservice.client.StudentClient;
import com.elearning.enrollmentservice.dto.CourseDto;
import com.elearning.enrollmentservice.dto.StudentDto;
import com.elearning.enrollmentservice.entity.Enrollment;
import com.elearning.enrollmentservice.exception.DuplicateEnrollmentException;
import com.elearning.enrollmentservice.exception.ResourceNotFoundException;
import com.elearning.enrollmentservice.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.elearning.enrollmentservice.dto.MyCourseResponseDto;

import java.util.List;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository
            enrollmentRepository;

    private final StudentClient
            studentClient;

    private final CourseClient
            courseClient;

    public Enrollment enrollStudent(
            Long studentId,
            Long courseId
    ) {

        StudentDto student =
                studentClient.getStudentById(
                        studentId
                );

        if(student == null) {

            throw new ResourceNotFoundException(
                    "Student not found"
            );
        }

        CourseDto course =
                courseClient.getCourseById(
                        courseId
                );

        if(course == null) {

            throw new ResourceNotFoundException(
                    "Course not found"
            );
        }

        if(course.getMaxCapacity() == null) {

            throw new ResourceNotFoundException(
                    "Course capacity is not defined"
            );
        }

        Integer currentEnrollments =
                course.getCurrentEnrollments();

        if(currentEnrollments == null) {

            currentEnrollments = 0;
        }

        if(currentEnrollments
                >= course.getMaxCapacity()) {

            throw new ResourceNotFoundException(
                    "Course is full"
            );
        }

        boolean alreadyEnrolled =
                enrollmentRepository
                        .existsByStudentIdAndCourseId(
                                studentId,
                                courseId
                        );

        if(alreadyEnrolled) {

            throw new DuplicateEnrollmentException(
                    "Student already enrolled in this course"
            );
        }

        Enrollment enrollment =
                Enrollment.builder()

                        .studentId(student.getId())

                        .courseId(course.getId())

                        .enrollmentDate(
                                LocalDateTime.now()
                        )

                        .build();

        Enrollment savedEnrollment =
                enrollmentRepository.save(
                        enrollment
                );

        courseClient.incrementEnrollment(
                courseId
        );

        return savedEnrollment;
    }
    public List<MyCourseResponseDto>
getStudentCourses(Long studentId) {

    return enrollmentRepository
            .findByStudentId(studentId)

            .stream()

            .map(enrollment -> {

                CourseDto course =
                        courseClient.getCourseById(
                                enrollment.getCourseId()
                        );

                return MyCourseResponseDto
                        .builder()

                        .enrollmentId(
                                enrollment.getId()
                        )

                        .courseId(
                                course.getId()
                        )

                        .title(
                                course.getTitle()
                        )

                        .description(
                                course.getDescription()
                        )

                        .instructor(
                                course.getInstructor()
                        )

                        .build();

            })

            .toList();
}

    public void cancelEnrollment(
            Long enrollmentId
    ) {

        Enrollment enrollment =
                enrollmentRepository
                        .findById(enrollmentId)

                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Enrollment not found"
                                )
                        );

        courseClient.decrementEnrollment(
                enrollment.getCourseId()
        );

        enrollmentRepository.delete(
                enrollment
        );
    }}