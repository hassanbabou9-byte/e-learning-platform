# E-Learning Platform - Microservices Architecture

## Description

E-Learning Platform is a full-stack microservices-based web application developed using Spring Boot, Spring Cloud, PostgreSQL, React, and Tailwind CSS.

The platform enables students to register, authenticate, browse courses, enroll in available courses, manage their enrollments, and monitor their learning activity through a modern dashboard.

The backend follows a Microservices Architecture with Service Discovery (Eureka) and API Gateway patterns.

---

## Features

### Authentication & Security

* Student Registration
* Student Login
* JWT Authentication
* Protected Routes
* Secure API Access Through API Gateway

### Course Management

* Create New Courses
* View Available Courses
* Search Courses
* Course Capacity Management
* Course Occupancy Progress Bar
* Recent Courses Tracking

### Enrollment Management

* Enroll in Courses
* Prevent Duplicate Enrollments
* Course Capacity Validation
* View Personal Enrolled Courses
* Cancel Enrollment
* Automatic Enrollment Counter Update

### Dashboard & Analytics

* Total Students
* Total Courses
* Total Enrollments
* My Courses Counter
* Statistics Charts
* Recent Courses Overview

---

## System Architecture

### Backend Microservices

#### Discovery Server

* Eureka Service Registry
* Service Discovery

#### API Gateway

* Single Entry Point
* Request Routing
* JWT Validation

#### Student Service

* Student Registration
* Authentication
* JWT Generation
* Student Management

#### Course Service

* Course Management
* Capacity Tracking
* Recent Courses

#### Enrollment Service

* Student Enrollment
* Enrollment Cancellation
* Communication Between Services

---

## Microservices Communication Flow

Frontend

↓

API Gateway

↓

Eureka Discovery Server

↓

Student Service

Course Service

Enrollment Service

All services register automatically with Eureka and communicate through service discovery.

---

## Technologies

### Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Cloud Gateway
* Spring Cloud Eureka
* Spring Data JPA
* OpenFeign
* JWT
* PostgreSQL
* Maven
* Lombok

### Frontend

* React
* React Router
* Axios
* Tailwind CSS
* Recharts
* Lucide React
* React Hot Toast

---

## Project Structure

```text
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

## How to Run the Project

### 1. Start Discovery Server

```bash
cd discovery-server
mvn spring-boot:run
```

Runs on:

```text
http://localhost:8761
```

### 2. Start API Gateway

```bash
cd api-gateway
mvn spring-boot:run
```

Runs on:

```text
http://localhost:8080
```

### 3. Start Student Service

```bash
cd student-service
mvn spring-boot:run
```

### 4. Start Course Service

```bash
cd course-service
mvn spring-boot:run
```

### 5. Start Enrollment Service

```bash
cd enrollment-service
mvn spring-boot:run
```

### 6. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Future Improvements

* Role-Based Access Control (Admin / Student)
* Course Categories
* Course Content Management
* File Uploads
* Notifications
* Docker & Kubernetes Deployment
* CI/CD Pipeline
* Unit & Integration Testing

---

## Author

**El Hassane Babou**

Computer Engineering Student

ENSA Al Hoceima

Passionate about Backend Development, Software Architecture, and Artificial Intelligence.
