USE PruebaTecnicaDB;
GO

-- 1. Tabla de Países
CREATE TABLE Paises (
    PaisId INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL
);

-- 2. Tabla de Departamentos
CREATE TABLE Departamentos (
    DepartamentoId INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    PaisId INT NOT NULL,
    CONSTRAINT FK_Departamentos_Paises FOREIGN KEY (PaisId) 
        REFERENCES Paises(PaisId) 
        ON DELETE CASCADE
);

-- 3. Tabla de Ciudades
CREATE TABLE Ciudades (
    CiudadId INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    DepartamentoId INT NOT NULL,
    CONSTRAINT FK_Ciudades_Departamentos FOREIGN KEY (DepartamentoId) 
        REFERENCES Departamentos(DepartamentoId) 
        ON DELETE CASCADE
);
GO

-----------------------------------------------------------
-- 1. INSERTAR PAÍSES
-----------------------------------------------------------
INSERT INTO Paises (Nombre) VALUES ('Colombia');
DECLARE @ColombiaID INT = SCOPE_IDENTITY();

INSERT INTO Paises (Nombre) VALUES ('México');
DECLARE @MexicoID INT = SCOPE_IDENTITY();

INSERT INTO Paises (Nombre) VALUES ('España');
DECLARE @EspanaID INT = SCOPE_IDENTITY();

-----------------------------------------------------------
-- 2. INSERTAR DEPARTAMENTOS / ESTADOS / PROVINCIAS
-----------------------------------------------------------
-- Para Colombia
INSERT INTO Departamentos (Nombre, PaisId) VALUES ('Antioquia', @ColombiaID);
DECLARE @AntioquiaID INT = SCOPE_IDENTITY();

INSERT INTO Departamentos (Nombre, PaisId) VALUES ('Cundinamarca', @ColombiaID);
DECLARE @CundinamarcaID INT = SCOPE_IDENTITY();

-- Para México
INSERT INTO Departamentos (Nombre, PaisId) VALUES ('Jalisco', @MexicoID);
DECLARE @JaliscoID INT = SCOPE_IDENTITY();

INSERT INTO Departamentos (Nombre, PaisId) VALUES ('Nuevo León', @MexicoID);
DECLARE @NuevoLeonID INT = SCOPE_IDENTITY();

-- Para España
INSERT INTO Departamentos (Nombre, PaisId) VALUES ('Madrid', @EspanaID);
DECLARE @MadridID INT = SCOPE_IDENTITY();

-----------------------------------------------------------
-- 3. INSERTAR CIUDADES
-----------------------------------------------------------
-- Ciudades de Antioquia (Colombia)
INSERT INTO Ciudades (Nombre, DepartamentoId) VALUES ('Medellín', @AntioquiaID);
INSERT INTO Ciudades (Nombre, DepartamentoId) VALUES ('Envigado', @AntioquiaID);
INSERT INTO Ciudades (Nombre, DepartamentoId) VALUES ('Rionegro', @AntioquiaID);

-- Ciudades de Cundinamarca (Colombia)
INSERT INTO Ciudades (Nombre, DepartamentoId) VALUES ('Bogotá', @CundinamarcaID);
INSERT INTO Ciudades (Nombre, DepartamentoId) VALUES ('Chía', @CundinamarcaID);

-- Ciudades de Jalisco (México)
INSERT INTO Ciudades (Nombre, DepartamentoId) VALUES ('Guadalajara', @JaliscoID);
INSERT INTO Ciudades (Nombre, DepartamentoId) VALUES ('Zapopan', @JaliscoID);

-- Ciudades de Nuevo León (México)
INSERT INTO Ciudades (Nombre, DepartamentoId) VALUES ('Monterrey', @NuevoLeonID);

-- Ciudad de Madrid (España)
INSERT INTO Ciudades (Nombre, DepartamentoId) VALUES ('Alcalá de Henares', @MadridID);
GO

-- VERIFICACIÓN FINAL
SELECT p.Nombre AS Pais, d.Nombre AS Departamento, c.Nombre AS Ciudad
FROM Paises p
JOIN Departamentos d ON p.PaisId = d.PaisId
JOIN Ciudades c ON d.DepartamentoId = c.DepartamentoId
ORDER BY p.Nombre, d.Nombre, c.Nombre;