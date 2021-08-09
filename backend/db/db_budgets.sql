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
    is_admin BIT DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id)
);

CREATE TABLE Projects(
    project_id INT NOT NULL IDENTITY(1,1),
    project_name VARCHAR(255) NOT NULL,
    project_version VARCHAR(5),
    user_id INT NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(project_id),
    FOREIGN KEY(user_id) REFERENCES Users(user_id)
);

CREATE TABLE Months(
    month_id INT NOT NULL IDENTITY(1,1),
    month_name VARCHAR(2) NOT NULL,
    incomes FLOAT NOT NULL,
    is_initial BIT DEFAULT 0,
    project_id INT NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(month_id),
    FOREIGN KEY(project_id) REFERENCES Projects(project_id)
);
--La tabla Months define las columnas a utilizar de cada proyecto, cada concepto despues de flujo de efectivo 
CREATE TABLE Incomes(
    income_id INT NOT NULL IDENTITY(1,1),
    month_id INT NOT NULL,
    concept VARCHAR(255) NOT NULL,
    amount FLOAT NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(income_id),
    FOREIGN KEY(month_id) REFERENCES Months(month_id)
);

CREATE TABLE Directcosts_Expenses( 
    --Se colocan en la misma tabla los puntos 4.5 y 4.6 porque tienen las mismas opciones
    direct_id INT NOT NULL IDENTITY(1,1),
    month_id INT NOT NULL,
    --1 Creación con concepto-se edita | 2 Creación suma a base de otras columnas-No se edita ¿que columnas? | 3 Creación a partir de porcentaje de otra columna - ¿qué col y valor de %?
    type_creation TINYINT(1) NOT NULL,
    concept VARCHAR(255) NOT NULL, -- Para 1 se guarda un input | 2 se guarda el nombre de las col | 3 Nombre de col
    amount FLOAT NOT NULL, -- Para 1 se guarda val input | 2 se guarda total de la suma | Se guarda el valor despues de obtener el %
    percent INT, -- Se guarda el valor del porcentaje de la opcion 3
    type_element TINYINT(1) NOT NULL, -- 1 Direct Cost | 2 Expense
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(direct_id),
    FOREIGN KEY(month_id) REFERENCES Months(month_id)
);

CREATE TABLE Sinews(
    --Recursos
    sinews_id INT NOT NULL IDENTITY(1,1),
    month_id INT NOT NULL,
    rol_name VARCHAR(255) NOT NULL,
    cost FLOAT NOT NULL, 
    percent INT NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(sinews_id),
    FOREIGN KEY(month_id) REFERENCES Months(month_id)
);