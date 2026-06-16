package com.elearning.enrollmentservice.dto;

import lombok.Data;

@Data
public class CourseDto {

    private Long id;
    private String title;
    private String description;
    private String instructor;
    private Integer maxCapacity;
    private Integer currentEnrollments = 0;
}