-- 1. Crear la base de datos para la prueba técnica
CREATE DATABASE PruebaTecnicaDB;
GO

-- 2. Seleccionar la base de datos recién creada
USE PruebaTecnicaDB;
GO

-- 3. Crear la tabla de Empleados (Punto 1 del ejercicio)
CREATE TABLE Empleados (
    EmpleadoId INT IDENTITY(1,1) PRIMARY KEY, -- ID único que aumenta solo
    Nombre NVARCHAR(50) NOT NULL,
    Apellido NVARCHAR(50) NOT NULL,
    CorreoElectronico NVARCHAR(100) NOT NULL UNIQUE, -- El correo no se puede repetir
    Cargo NVARCHAR(50) NOT NULL,
    FechaRegistro DATETIME DEFAULT GETDATE() -- Fecha automática
);
GO

-- 4. Insertar un registro de prueba para verificar que funciona
INSERT INTO Empleados (Nombre, Apellido, CorreoElectronico, Cargo)
VALUES ('TuNombre', 'TuApellido', 'correo@ejemplo.com', 'Candidato Mid Developer');
GO

-- 5. Mostrar la tabla con los datos
SELECT * FROM Empleados;