package com.elearning.courseservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseResponseDto {

    private Long id;

    private String title;

    private String description;

    private String instructor;

    private Integer maxCapacity;

    private Integer currentEnrollments;
}