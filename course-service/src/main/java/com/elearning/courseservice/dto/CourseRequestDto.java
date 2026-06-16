package com.elearning.courseservice.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CourseRequestDto {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Instructor is required")
    private String instructor;

    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer maxCapacity;
}