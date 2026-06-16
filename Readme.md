# E-Learning Platform - Microservices Architecture

## Description

E-Learning Platform is a microservices-based application developed with Spring Boot and React.

The platform allows students to:

- Register and authenticate using JWT
- Browse available courses
- Enroll in courses
- Manage course capacity
- Access a modern dashboard with statistics

---

## Architecture

### Backend Microservices

- Discovery Server (Eureka)
- API Gateway
- Student Service
- Course Service
- Enrollment Service

### Frontend

- React
- Tailwind CSS
- Axios
- React Router

---

## Technologies

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Cloud Gateway
- Eureka Discovery Server
- JWT Authentication
- PostgreSQL
- Maven

### Frontend

- React
- Tailwind CSS
- Axios
- Recharts
- Lucide React

---

## Microservices Communication

Frontend
→ API Gateway
→ Student Service
→ Course Service
→ Enrollment Service

Service Discovery is handled using Eureka.

---

## Features

### Authentication

- Student Registration
- Student Login
- JWT Authentication

### Courses

- Create Course
- View Courses
- Search Courses
- Course Capacity Management

### Enrollment

- Student Enrollment
- Duplicate Enrollment Prevention
- Maximum Capacity Validation

### Dashboard

- Statistics Overview
- Charts and Analytics
- Recent Courses

---

## Project Structure

```
E-learning
│
├── api-gateway
├── discovery-server
├── student-service
├── course-service
├── enrollment-service
└── frontend
```

---

## Author

El Hassane Babou

Computer Engineering Student
ENSA Al Hoceima