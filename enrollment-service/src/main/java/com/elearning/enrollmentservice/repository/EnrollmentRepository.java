package com.elearning.enrollmentservice.repository;

import com.elearning.enrollmentservice.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnrollmentRepository
        extends JpaRepository<Enrollment, Long> {

    boolean existsByStudentIdAndCourseId(
            Long studentId,
            Long courseId
    );

    List<Enrollment> findByStudentId(
            Long studentId
    );
}