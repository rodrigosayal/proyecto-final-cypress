# 🧪 Proyecto Final - Diseño e Implementación de Pruebas de Software

Este repositorio contiene el **Proyecto Final de Automatización con Cypress** realizado para la materia *Diseño e Implementación de Pruebas de Software*. El objetivo del proyecto es documentar y automatizar un conjunto de casos de prueba tanto de Frontend (FE) como de Application Programming Interfaces (API) aplicando las buenas prácticas aprendidas en clase.

---

## 👥 Integrantes del Grupo
* **Rodrigo Sayal**
* **Ignacio Martin**
* **César Taddey**
* **Franco Meza**

---

## 📋 Requisitos Generales del Proyecto

* **Estructura:** Equipos de hasta 4 integrantes.
* **Casos de Prueba Documentados:** 15 casos de prueba en total, detallando Título, Descripción, Precondiciones y Pasos.
* **Casos de Prueba Automatizados:** 1 proyecto en Cypress que incluya la automatización de los 15 casos de prueba utilizando los conceptos y metodologías enseñadas en la cursada.
* **Criterio de Evaluación:** La nota final es **individual**, compuesta por el desempeño en los casos grupales (1, 2 y 3) y los 3 casos asignados a cada alumno.

---

## 🛠️ Especificaciones Técnicas y Reparto de Casos

### 🏫 Casos Grupales (Base Cátedra)
Los primeros 3 casos fueron provistos por la profesora como base pedagógica y práctica. **Su automatización y correcto funcionamiento afecta la calificación de todo el grupo.**
* **Caso de Prueba 1:** `Comprar carrito exitosamente y visualizar orden de compra` (Frontend)
* **Caso de Prueba 2:** `API | Comprar carrito exitosamente` (API)
* **Caso de Prueba 3:** `API | Error al comprar carrito sin token` (API)

> ⚠️ **IMPORTANTE:** Estos casos base no deben ser editados en su lógica estructural por los alumnos; únicamente deben ser completados en su automatización.

### 👤 Casos Individuales (Por Alumno)
Cada integrante del grupo tiene la responsabilidad de documentar y automatizar **3 casos adicionales**:
* **1 Caso de Frontend (FE)**
* **2 Casos de API** (1 con resultado exitoso y 1 con resultado de error, ambos sobre el mismo endpoint).

> 📌 **Regla de Nomenclatura:** Todos los títulos de los casos individuales deben incluir al final el *Nombre y Apellido* del alumno responsable.

#### 🗂️ Mapeo y Distribución de los 15 Casos:
* **Caso 1:** Comprar carrito exitosamente y visualizar orden de compra *(Grupal)*
* **Caso 2:** API | Comprar carrito exitosamente *(Grupal)*
* **Caso 3:** API | Error al comprar carrito sin token *(Grupal)*
* **Caso 4:** `FRONT | Agregar libro al wishlist, vaciar el wishlist y regresar al home
` | **Ignacio Martin**
* **Caso 5:** API | `API | Validar inicio de sesión exitosamente` | **Ignacio Martin**
* **Caso 6:** API | `API | Validar intento de inicio de sesión fallido con contraseña incorrecta` | **Ignacio Martin**
* **Caso 7:** `FRONT| 
Filtrar libros por categoría Drama y verificar resultados` | **Rodrigo Sayal**
* **Caso 8:** API | `API | Obtener historial de órdenes exitosamente` | **Rodrigo Sayal**
* **Caso 9:** API | `API | Error al obtener historial de órdenes sin token` | **Rodrigo Sayal**
* **Caso 10:** `[Título del Caso FE]` | **César Taddey**
* **Caso 11:** API | `[Título del Caso API Exitoso]` | **César Taddey**
* **Caso 12:** API | `[Título del Caso API Error]` | **César Taddey**
* **Caso 13:** `[Título del Caso FE]` | **Franco Meza**
* **Caso 14:** API | `[Título del Caso API Exitoso]` | **Franco Meza**
* **Caso 15:** API | `[Título del Caso API Error]` | **Franco Meza**

---

## 🎯 Criterios para la Calificación Máxima (10)

Para garantizar la máxima nota en las entregas, el proyecto cumple rigurosamente con los siguientes estándares de calidad:

### En la Automatización (Cypress):
1.  **Modelo Page Object Model (POM):** Implementado en su totalidad para asegurar la modularidad, escalabilidad y fácil mantenimiento del código de pruebas.
2.  **Comandos Personalizados:** Implementación de al menos 1 comando personalizado (`Cypress.Commands.add`) para optimizar procesos repetitivos (ej. login, manejo de tokens).
3.  **Estabilidad:** El 100% de las pruebas automatizadas funcionan correctamente de inicio a fin sin falsos positivos ni interrupciones (*flakiness*).

### En la Documentación:
1.  **Completitud:** Cada uno de los 15 casos cuenta con estructura rigurosa: *Título formal, Descripción del objetivo, Precondiciones del entorno y Pasos detallados secuencialmente*.
2.  **Precisión:** Redacción técnica impecable y libre de errores conceptuales o de lógica de negocio.

---

## 🚀 Ejecución del Proyecto Localmente

Si necesitás clonar y correr este proyecto en tu entorno local, asegurate de seguir estos pasos:

1. **Instalar las dependencias de Node.js:**
   ```bash
   npm install
