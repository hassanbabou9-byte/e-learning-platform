package com.elearning.courseservice.repository;

import com.elearning.courseservice.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository
        extends JpaRepository<Course, Long> {

    List<Course> findTop5ByOrderByCreatedAtDesc();

}