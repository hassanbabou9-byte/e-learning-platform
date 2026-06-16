package com.elearning.studentservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentResponseDto {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;
}