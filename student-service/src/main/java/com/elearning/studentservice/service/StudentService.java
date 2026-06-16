package com.elearning.studentservice.service;

import com.elearning.studentservice.dto.LoginRequest;
import com.elearning.studentservice.dto.LoginResponse;
import com.elearning.studentservice.dto.StudentRequestDto;
import com.elearning.studentservice.dto.StudentResponseDto;
import com.elearning.studentservice.entity.Student;
import com.elearning.studentservice.exception.DuplicateResourceException;
import com.elearning.studentservice.exception.InvalidCredentialsException;
import com.elearning.studentservice.exception.ResourceNotFoundException;
import com.elearning.studentservice.jwt.JwtService;
import com.elearning.studentservice.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final JwtService jwtService;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    public LoginResponse login(LoginRequest request) {

        Student student = studentRepository.findByEmail(
                        request.getEmail()
                )
                .orElseThrow(() ->
                        new InvalidCredentialsException(
                                "Invalid email or password"
                        )
                );

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                student.getPassword()
        );

        if(!matches) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(
                student.getId(),
                student.getFirstName(),
                student.getLastName(),
                student.getEmail()
        );

        return new LoginResponse(token);
    }
    public StudentResponseDto registerStudent(StudentRequestDto dto) {

        if(studentRepository.existsByEmail(dto.getEmail())) {
            throw new DuplicateResourceException(
                    "Email already exists"
            );
        }

        Student student = Student.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .build();

        Student savedStudent = studentRepository.save(student);

        return mapToResponse(savedStudent);
    }

    public List<StudentResponseDto> getAllStudents() {

        return studentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public StudentResponseDto getStudentById(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Student not found"
                ));

        return mapToResponse(student);
    }

    private StudentResponseDto mapToResponse(Student student) {

        return StudentResponseDto.builder()
                .id(student.getId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .build();
    }
}