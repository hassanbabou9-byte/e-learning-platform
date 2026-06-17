package com.elearning.courseservice.service;

import com.elearning.courseservice.dto.CourseRequestDto;
import com.elearning.courseservice.dto.CourseResponseDto;
import com.elearning.courseservice.entity.Course;
import com.elearning.courseservice.exception.CourseFullException;
import com.elearning.courseservice.exception.ResourceNotFoundException;
import com.elearning.courseservice.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseResponseDto createCourse(
            CourseRequestDto dto
    ) {

        Course course = Course.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .instructor(dto.getInstructor())
                .maxCapacity(dto.getMaxCapacity())
                .currentEnrollments(0)
                .createdAt(LocalDateTime.now())
                .build();

        Course savedCourse =
                courseRepository.save(course);

        return mapToResponse(savedCourse);
    }

    public List<CourseResponseDto> getAllCourses() {

        return courseRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<CourseResponseDto> getRecentCourses() {

        return courseRepository
                .findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    public void decrementEnrollment(
            Long courseId
    ) {

        Course course =
                courseRepository.findById(courseId)

                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Course not found"
                                )
                        );

        if(course.getCurrentEnrollments() > 0) {

            course.setCurrentEnrollments(
                    course.getCurrentEnrollments() - 1
            );

            courseRepository.save(course);
        }
    }
    public CourseResponseDto getCourseById(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Course not found"
                        )
                );

        return mapToResponse(course);
    }

    public void incrementEnrollment(Long courseId) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Course not found"
                        )
                );

        if(course.getCurrentEnrollments()
                >= course.getMaxCapacity()) {

            throw new CourseFullException(
                    "Course is full"
            );
        }

        course.setCurrentEnrollments(
                course.getCurrentEnrollments() + 1
        );

        courseRepository.save(course);
    }

    private CourseResponseDto mapToResponse(
            Course course
    ) {

        return CourseResponseDto.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .instructor(course.getInstructor())
                .maxCapacity(course.getMaxCapacity())
                .currentEnrollments(
                        course.getCurrentEnrollments()
                )
                .build();
    }
}