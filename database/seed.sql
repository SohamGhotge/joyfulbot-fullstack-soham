USE elms_db;

INSERT INTO departments (name, manager_id) VALUES
('Engineering', NULL),
('Human Resources', NULL),
('Finance', NULL);

INSERT INTO leave_types (name, max_days_per_year, description) VALUES
('Casual Leave', 12, 'For personal and casual purposes'),
('Sick Leave', 10, 'For medical and health related reasons'),
('Earned Leave', 15, 'Earned through continuous service');

INSERT INTO users (name, email, password_hash, role, department_id) VALUES
('Raj Mehta', 'raj.mehta@joyfulbot.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lkii', 'MANAGER', 1),
('Soham Naik', 'soham.naik@joyfulbot.com', '$2a$10$8K1p/a0dR1xqM8K3S6hkiudSd3LQOaXb6ATM/9Nqv4vWyMLtGW7dW', 'EMPLOYEE', 1),
('Priya Sharma', 'priya.sharma@joyfulbot.com', '$2a$10$8K1p/a0dR1xqM8K3S6hkiudSd3LQOaXb6ATM/9Nqv4vWyMLtGW7dW', 'EMPLOYEE', 1),
('Amit Joshi', 'amit.joshi@joyfulbot.com', '$2a$10$8K1p/a0dR1xqM8K3S6hkiudSd3LQOaXb6ATM/9Nqv4vWyMLtGW7dW', 'EMPLOYEE', 2),
('Neha Kulkarni', 'neha.kulkarni@joyfulbot.com', '$2a$10$8K1p/a0dR1xqM8K3S6hkiudSd3LQOaXb6ATM/9Nqv4vWyMLtGW7dW', 'EMPLOYEE', 2),
('Rohit Das', 'rohit.das@joyfulbot.com', '$2a$10$8K1p/a0dR1xqM8K3S6hkiudSd3LQOaXb6ATM/9Nqv4vWyMLtGW7dW', 'EMPLOYEE', 3);

UPDATE departments SET manager_id = 1 WHERE id = 1;
UPDATE departments SET manager_id = 1 WHERE id = 2;
UPDATE departments SET manager_id = 1 WHERE id = 3;

INSERT INTO leave_balances (user_id, leave_type_id, year, total_days, used_days, remaining_days) VALUES
(2, 1, 2025, 12, 0, 12),(2, 2, 2025, 10, 0, 10),(2, 3, 2025, 15, 0, 15),
(3, 1, 2025, 12, 0, 12),(3, 2, 2025, 10, 0, 10),(3, 3, 2025, 15, 0, 15),
(4, 1, 2025, 12, 0, 12),(4, 2, 2025, 10, 0, 10),(4, 3, 2025, 15, 0, 15),
(5, 1, 2025, 12, 0, 12),(5, 2, 2025, 10, 0, 10),(5, 3, 2025, 15, 0, 15),
(6, 1, 2025, 12, 0, 12),(6, 2, 2025, 10, 0, 10),(6, 3, 2025, 15, 0, 15);

INSERT INTO leave_applications (employee_id, leave_type_id, start_date, end_date, total_days, reason, status, reviewed_by, reviewed_at, remarks) VALUES
(2, 1, '2025-01-06', '2025-01-08', 3, 'Personal work', 'APPROVED', 1, '2025-01-05 10:00:00', 'Approved'),
(2, 2, '2025-02-10', '2025-02-11', 2, 'Fever and cold', 'APPROVED', 1, '2025-02-09 09:00:00', 'Get well soon'),
(3, 1, '2025-03-03', '2025-03-04', 2, 'Family function', 'REJECTED', 1, '2025-03-02 11:00:00', 'Critical deadline'),
(3, 3, '2025-04-07', '2025-04-09', 3, 'Vacation', 'APPROVED', 1, '2025-04-06 10:00:00', 'Approved'),
(4, 2, '2025-05-05', '2025-05-06', 2, 'Doctor appointment', 'PENDING', NULL, NULL, NULL),
(4, 1, '2025-06-02', '2025-06-03', 2, 'Personal errands', 'PENDING', NULL, NULL, NULL),
(5, 3, '2025-07-14', '2025-07-16', 3, 'Annual vacation', 'PENDING', NULL, NULL, NULL),
(5, 1, '2025-08-04', '2025-08-05', 2, 'Home repairs', 'REJECTED', 1, '2025-08-03 09:00:00', 'Team understaffed'),
(6, 2, '2025-09-08', '2025-09-09', 2, 'Medical checkup', 'APPROVED', 1, '2025-09-07 10:00:00', 'Approved'),
(6, 1, '2025-10-13', '2025-10-14', 2, 'Festival celebration', 'PENDING', NULL, NULL, NULL);

UPDATE leave_balances SET used_days = 5, remaining_days = 7 WHERE user_id = 2 AND leave_type_id = 1 AND year = 2025;
UPDATE leave_balances SET used_days = 2, remaining_days = 8 WHERE user_id = 2 AND leave_type_id = 2 AND year = 2025;
UPDATE leave_balances SET used_days = 2, remaining_days = 13 WHERE user_id = 3 AND leave_type_id = 1 AND year = 2025;
UPDATE leave_balances SET used_days = 3, remaining_days = 12 WHERE user_id = 3 AND leave_type_id = 3 AND year = 2025;
UPDATE leave_balances SET used_days = 3, remaining_days = 12 WHERE user_id = 5 AND leave_type_id = 3 AND year = 2025;
UPDATE leave_balances SET used_days = 2, remaining_days = 8 WHERE user_id = 6 AND leave_type_id = 2 AND year = 2025;
