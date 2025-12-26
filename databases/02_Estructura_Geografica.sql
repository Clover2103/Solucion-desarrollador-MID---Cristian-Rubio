USE PruebaTecnicaDB;
GO

-- 1. Tabla de Países
CREATE TABLE Paises (
    PaisId INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL
);

-- 2. Tabla de Departamentos (Relacionada a País)
CREATE TABLE Departamentos (
    DepartamentoId INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    PaisId INT NOT NULL,
    CONSTRAINT FK_Departamentos_Paises FOREIGN KEY (PaisId) REFERENCES Paises(PaisId)
);

-- 3. Tabla de Ciudades (Relacionada a Departamento)
CREATE TABLE Ciudades (
    CiudadId INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    DepartamentoId INT NOT NULL,
    CONSTRAINT FK_Ciudades_Departamentos FOREIGN KEY (DepartamentoId) REFERENCES Departamentos(DepartamentoId)
);
GO

-- 4. Datos iniciales (Seed Data) para que la API tenga qué mostrar
INSERT INTO Paises (Nombre) VALUES ('Colombia'), ('México');
INSERT INTO Departamentos (Nombre, PaisId) VALUES ('Antioquia', 1), ('Bogotá D.C.', 1), ('Jalisco', 2);
INSERT INTO Ciudades (Nombre, DepartamentoId) VALUES ('Medellín', 1), ('Envigado', 1), ('Guadalajara', 3);
GO

-- Verificar que las relaciones funcionan
SELECT p.Nombre AS Pais, d.Nombre AS Departamento, c.Nombre AS Ciudad
FROM Paises p
JOIN Departamentos d ON p.PaisId = d.PaisId
JOIN Ciudades c ON d.DepartamentoId = c.DepartamentoId;