# Gestión Integral - Prueba Técnica Desarrollador .NET & Angular

Este repositorio contiene la solución a la prueba técnica para el cargo de Desarrollador MID. La aplicación permite la gestión de información geográfica (Países, Departamentos y Ciudades) adicional creacion mediante SQL server de la tabla empleados.

## 🚀 Tecnologías Utilizadas

* **Backend:** .NET Core / Entity Framework Core.
* **Frontend:** Angular 17+ (Componentes Standalone).
* **Base de Datos:** SQL Server.
* **Estilos:** Bootstrap 5.

## 🛠️ Estructura del Proyecto

* `/backend`: API REST construida con .NET. Implementa arquitectura por capas y Entity Framework para el acceso a datos.
* `/frontend`: Aplicación SPA en Angular con gestión de estados y servicios asíncronos.
* `/database`: Script SQL para la creación de tablas, relaciones de integridad y datos de prueba (Seed Data).

## 💎 Características Destacadas

1.  **Integridad Referencial:** Implementación de borrado en cascada (`ON DELETE CASCADE`) tanto a nivel de motor SQL como en la configuración de `OnModelCreating` en el DbContext de .NET.
2.  **UX/UI Optimizada:** Interfaz de tres columnas con carga asíncrona y detección de cambios manual (`ChangeDetectorRef`) para asegurar fluidez.
3.  **Calidad de Datos:** Lógica de negocio para la capitalización automática de nombres en el frontend.

## 🏁 Instrucciones de Instalación

1.  **Base de Datos:** Ejecutar el script ubicado en `/databases/02_Estructura_Geografica.sql` en SQL Server.
2.  **Backend:** * Configurar el `ConnectionStrings` en `appsettings.json`.
    * Ejecutar `dotnet run`.
3.  **Frontend:** * Ejecutar `npm install`.
    * Ejecutar `ng serve`.

---
Desarrollado por Cristian Fidel Rubio Pacheco
