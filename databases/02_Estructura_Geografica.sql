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