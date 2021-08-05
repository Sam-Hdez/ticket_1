CREATE DATABASE budgets;
GO

USE budgets;
GO

--roles TEXT DEFAULT '[]',
CREATE TABLE Users(
    user_id INT NOT NULL IDENTITY(1,1),
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    email VARCHAR(320) NOT NULL,
    encrypted_password VARCHAR(255) NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id)
);

