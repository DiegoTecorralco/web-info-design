# Pruebas Registro Tecommers

## **Validacion de Nombre (Campo vació)**

**Tipo de prueba:** campo vacío.
**Mensaje:** "El nombre completo es obligatorio".
**feedback:** "Mínimo 3 caracteres".

![alt text](image-42.png)

## **Validacion de Nombre (Campo incompleto)**

**Tipo de prueba:** campo incompleto (menos de 3 caracteres).
**Mensaje:** "El nombre completo debe de tener minimo 3 caracteres".
**feedback:** "Mínimo 3 caracteres".

![alt text](image-43.png)

## **Validacion de Nombre (Campo con números)**

**Tipo de prueba:** campo inválido (contiene numeros).
**Mensaje:** "El nombre no puede contener números".
**feedback:** "Mínimo 3 caracteres".

![alt text](image-46.png)

## **Validacion de Nombre (Campo con caracteres especiales)**

**Tipo de prueba:** campo inválido (contiene caracteres especiales).
**Mensaje:** "El nombre solo puede contener letras y espacios".
**feedback:** "Mínimo 3 caracteres".

![alt text](image-47.png)   


## **Validacion de Nombre (Campo sin almenos un espacio)**

**Tipo de prueba:** campo inválido (el campo de nombre solo tiene texto pero no un espacio, esto nos asegura que al menos tenfga un nombre y un apellido).
**Mensaje:** "Por favor , ingresa nombre y apellido".
**feedback:** "Mínimo 3 caracteres".

![alt text](image-48.png)   

## **Validacion de Nombre (Campo válido)**

**Tipo de prueba:** campo válido (más de 3 caracteres, al menos un espacio, sin numeros, si caracteres especiales y menos de 50 caracteres).
**Mensaje:** No hay mensaje, el borde del campo se pone en verde.
**feedback:** "Mínimo 3 caracteres".

![alt text](image-44.png)


## **Validacion de Nombre (Campo válido 50 caracteres)**

**Tipo de prueba:** máximo de caracteres (poner 50 caracteres, con al menos un espacio).

**Nota:** El sistema automáticamente ya no deja poner más de 50 caracteres aunque lo intentes.

![alt text](image-45.png)