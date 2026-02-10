## **Campos Seleccionados para Validación**

Campo	Tipo	Descripción
Email	Formato específico	Dirección de correo electrónico válida
Teléfono	Formato específico	Número telefónico chileno válido
Contraseña	Formato específico	Contraseña segura
Nombre completo	Obligatorio	Campo requerido

| Campo | Tipo | Descripción |
|-------|------|-------------|
| **Email** | Formato específico | Dirección de correo electrónico válida |
| **Teléfono** | Formato específico | Número telefónico chileno válido |
| **Contraseña** | Formato específico | Contraseña segura |
| **Nombre completo** | Obligatorio | Campo requerido |

## **Reglas de Validación Detalladas**

### **Email**
- **Formato válido**: `usuario@dominio.com` (o similar)
- **Requisitos**: 
  - Debe contener exactamente un símbolo `@`
  - Debe tener texto antes y después del `@`
  - El dominio debe contener al menos un punto
  - No permitir espacios

### **Teléfono** (Formato 10 dígitos )
- **Longitud**: 9 dígitos
- **Formato**: `1234567890`
- **Requisitos**:
  - Solo números (sin espacios, guiones o paréntesis)
  - Exactamente 10 caracteres

### **Contraseña**
- **Longitud mínima**: 8 caracteres
- **Requisitos**:
  - Al menos 1 letra mayúscula
  - Al menos 1 letra minúscula
  - Al menos 1 número
  - Al menos 1 carácter especial: `!@#$%^&*`

### **Nombre completo**
- **Obligatorio**: No puede estar vacío
- **Longitud mínima**: 3 caracteres
- **Longitud máxima**: 50 caracteres
- **Formato**: Solo letras y espacios
- **Inválido**: Números, caracteres especiales

## **Mensajes de Error Específicos**

### **Email**
- **Campo vacío**: "El correo electrónico es obligatorio"
- **Formato inválido**: "Ingresa un correo válido (ejemplo: usuario@dominio.com)"
- **Sin @**: "El correo debe incluir el símbolo @"
- **Dominio incompleto**: "El dominio del correo parece incompleto"

### **Teléfono**
- **Campo vacío**: "El teléfono es obligatorio"
- **Formato inválido**: "Ingresa 10 dígitos todos deben ser números"
- **Muy corto/largo**: "El teléfono debe tener exactamente 10 dígitos"

### **Contraseña**
- **Campo vacío**: "La contraseña es obligatoria"
- **Muy corta**: "La contraseña debe tener al menos 8 caracteres"
- **Falta mayúscula**: "Incluye al menos una letra mayúscula"
- **Falta minúscula**: "Incluye al menos una letra minúscula"
- **Falta número**: "Incluye al menos un número"
- **Falta carácter especial**: "Incluye al menos un carácter especial (!@#$%^&*)"

### **Nombre completo**
- **Campo vacío**: "El nombre completo es obligatorio"
- **Muy corto**: "El nombre debe tener al menos 2 caracteres"
- **Caracteres inválidos**: "Solo se permiten letras y espacios"

## **Diseño de Verificación Humana**

### **Mecanismo seleccionado: Pregunta Lógica**
**Justificación**: Simple, accesible y adecuada para e-commerce donde queremos minimizar fricción.

**Implementación**:
```

Pregunta de seguridad: ¿Cuál es el resultado de 5 + 7?
[________] (campo para respuesta)
```

**Preguntas alternativas** (selección aleatoria):
1. "¿Cuántos lados tiene un triangulo?" → **3**
2. "¿Cuánto es 5 + 7?" → **12**


**Validación**:
- Respuesta en minúsculas/MAYÚSCulas aceptada
- Solo verificar contenido, no formato exacto
- Mensaje de error: "Respuesta incorrecta. Por favor, intenta nuevamente"

## **Implementación de Feedback Visual**

### **Estados del campo**:
- **Válido**: Borde verde ✓ + mensaje "Campo válido" (opcional)
- **Inválido**: Borde rojo + mensaje de error específico

### **Momento de validación**:
1. **Validación en tiempo real**: Al salir del campo (evento `blur`)
2. **Validación final**: Al hacer clic en "Enviar"

### **Ubicación mensajes**:
- Mensaje de error debajo del campo correspondiente
- Fuente: 0.9em, color: #d32f2f (rojo)
- Icono: ⚠️ al inicio del mensaje

## **Flujo de Validación Completo**

1. Usuario completa formulario
2. Validación por campo al salir de cada uno
3. Al enviar, validación completa de todos los campos
4. Si hay errores:
   - Scroll automático al primer error
   - Foco en el primer campo con error
   - Mostrar todos los mensajes de error
5. Si pasa verificación humana y validaciones:
   - Envío exitoso
   - Mensaje: "¡Registro completado! Revisa tu email para confirmar"

## **Consideraciones de UX**

### **Performance**:
- Validación del lado del cliente (JavaScript)
- Validación del lado del servidor (obligatoria para seguridad)
- Debouncing en validación en tiempo real (300ms)

### **Compatibilidad**:
- Funciona sin JavaScript (fallback a validación solo en servidor)
- Responsive para móviles y desktop