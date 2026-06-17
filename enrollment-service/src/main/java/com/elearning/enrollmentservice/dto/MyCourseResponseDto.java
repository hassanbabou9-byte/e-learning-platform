package com.elearning.enrollmentservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyCourseResponseDto {

    private Long enrollmentId;

    private Long courseId;

    private String title;

    private String description;

    private String instructor;
}