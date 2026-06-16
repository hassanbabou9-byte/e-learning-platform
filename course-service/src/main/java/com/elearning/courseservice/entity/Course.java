package com.elearning.courseservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String instructor;

    private Integer maxCapacity = 3;

    @Column(nullable = false)
    private Integer currentEnrollments = 0;

    private LocalDateTime createdAt;
}