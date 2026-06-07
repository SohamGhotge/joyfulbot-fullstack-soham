# Employee Leave Management System (ELMS)

A full-stack web application built with Angular 8 and Spring Boot 3.x that enables employees to apply for leaves and managers to approve or reject them.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Angular | 8.x |
| UI Components | Angular Material | 8.x |
| Backend | Spring Boot | 3.2.x |
| Security | Spring Security | 6.x |
| ORM | Spring Data JPA | 3.x |
| Database | MySQL | 8.x |
| Auth | JWT (JJWT) | 0.11.5 |
| Runtime | Java | 17 |
| Build | Maven | 3.8+ |

---

## Architecture
Angular 8 SPA (port 4200)
↕ HTTP REST API
Spring Boot 3.x (port 8080)
↕ JPA/Hibernate
MySQL 8.x (port 3306)

3-tier architecture:
- Presentation Layer — Angular 8 SPA
- Business Layer — Spring Boot REST API with JWT Security
- Data Layer — MySQL with Spring Data JPA

---

## Project Structure
joyfulbot-fullstack-soham/
├── backend/          # Spring Boot 3.x Maven project
├── frontend/         # Angular 8 project
├── database/
│   ├── schema.sql    # DDL scripts
│   └── seed.sql      # Seed data
├── docs/
│   ├── ERD.png                          # Entity Relationship Diagram
│   └── elms-api.postman_collection.json # Postman collection
└── README.md

---

## Database Setup

Database used: MySQL 8.x

1. Open MySQL Workbench
2. Connect with username `root`
3. Run `database/schema.sql`
4. Run `database/seed.sql`

---

## Backend Setup

```bash
cd backend
mvn spring-boot:run
```

Backend starts on `http://localhost:8080`

---

## Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Frontend starts on `http://localhost:4200`

---

## Seeded Users

| Role | Email | Password |
|------|-------|----------|
| Manager | raj.mehta@joyfulbot.com | password123 |
| Employee | soham.naik@joyfulbot.com | password123 |
| Employee | priya.sharma@joyfulbot.com | password123 |
| Employee | amit.joshi@joyfulbot.com | password123 |
| Employee | neha.kulkarni@joyfulbot.com | password123 |
| Employee | rohit.das@joyfulbot.com | password123 |

---

## API Summary

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | Public | Register new employee |
| POST | /api/auth/login | Public | Login and get JWT |
| POST | /api/leaves | Employee | Apply for leave |
| GET | /api/leaves | Employee | Get my leaves (paginated) |
| GET | /api/leaves/{id} | Employee | Get leave by id |
| PUT | /api/leaves/{id}/approve | Manager | Approve leave |
| PUT | /api/leaves/{id}/reject | Manager | Reject leave |
| DELETE | /api/leaves/{id} | Employee | Cancel pending leave |
| GET | /api/leaves/balance | Employee | Get leave balances |
| GET | /api/manager/team-leaves | Manager | Get team leaves (paginated) |
| GET | /api/manager/analytics | Manager | Get team analytics |
| GET | /api/departments | Public | Get all departments |
| GET | /api/leave-types | Employee | Get all leave types |

---

## Features

**Employee**
- Register and login
- Apply for leave with date range picker and auto working days calculation
- View own leave applications with pagination and status filter
- Cancel pending leave applications
- View leave balances by type

**Manager**
- Login and view team leave requests
- Approve or reject leaves with remarks via dialog
- View analytics — pending, approved, rejected, total counts

---

## Running Tests

```bash
cd frontend
ng test --code-coverage
```

---

## Git Commits

This project follows a structured commit history with 15 meaningful commits covering progressive development from database setup to final documentation.
