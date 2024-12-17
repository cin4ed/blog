---
title: "Laravel Sail en Mac Silicon"
description: "Dealing with Docker and a new processor architecture."
date: 2024-12-12
slug: running-laravel-sail-on-mac-silicon
---

<section class="introduction">
En este post hablo sobre Laravel Sail y cómo solucioné los problemas que 
surgieron al intentar ejecutar un proyecto antiguo en mi nueva Mac Mini M4.
</section>

# ¿Qué es Laravel Sail?

Si estás familiarizado con Laravel, probablemente hayas escuchado sobre Laravel
Sail. Para quienes no lo conocen, Laravel Sail es una herramienta proporcionada
por la comunidad de Laravel que, en teoría, nos facilita el proceso de configurar
un proyecto en nuestra computadora.

Cuando desarrollas un proyecto con Laravel, es necesario configurar una base de
datos: crearla, asignarle un usuario, establecer una contraseña, iniciar el
servicio, y luego editar el archivo `.env` para añadir las credenciales
correspondientes. Después, debes levantar el proyecto y esperar que todo
funcione correctamente (a veces no sin antes cruzar los dedos).

Aunque existen herramientas como Laragon, Landock, Lando, entre otras, que
simplifican este proceso, ninguna parece integrar todo de forma tan eficiente y
directa como Laravel Sail.

# Instalación

El primer paso es corroborar que Laravel Sail se encuentre instalado en tu
proyecto. Para hacerlo, accede a la carpeta que contiene tu proyecto y localiza
el archivo `composer.json`. Ábrelo con un editor de código o cualquier
aplicación que te permita visualizar su contenido.

Este archivo contiene la configuración utilizada por Composer, una herramienta de
gestión de dependencias en PHP. Este archivo define las bibiliotecas y paquetes
que tu proyecto necesita, así como la información básica del proyecto y las
instrucciones para gestionar las dependencias.

Dentro del archivo, busca una sección con llamada `require-dev`, esta sección
lista las dependencias necesarias exclusivamente para el desarrollo, es decir
código que no se incluye en el entorno de producción.

Si Laravel Sail está instalado, lo encontrarás como una dependencia dentro de
esta sección, similar a esto:

```
"require-dev": {
    ...
    "laravel/sail": "^1.26", // <----
    ...
},
```

Si no aparece en esta sección, puedes instalarlo ejecutando el siguiente
comando:

```
composer require laravel/sail --devw1
```

Una vez instalado veamos como se utiliza.

# Uso

- correr comando para que se genere el archivo docker compose
- correr sail con los contenedores necesarios.

# Problemas en Mac Silicon

platform: "linux/amd64"

# Mi base de datos no está siendo creada

Este problema se presenta cuando previamente se ejecutó el comando
./vendor/bin/sail up sin un archivo .env o este estando mal configurado.

Este comando crea un volumen de Docker que persiste causando problemas, para los
que no estan familiarizados con Docker esta puede ser una buena oportunidad para
conocer acerca del tema o aprender que es un volumen.

Para resolver este inconveniente basta con remover este volumen y las imagenes
que dependen de el:

./vendor/bin/sail down --rmi all -v

kenneth@192 sigiprof-backend % ./vendor/bin/sail down --rmi all -v
[+] Running 7/7
✔ Container sigiprof-backend-laravel.test-1 Removed 0.0s
✔ Container sigiprof-backend-mysql-1 Remove... 0.0s
✔ Volume sigiprof-backend_sail-mysql Remove... 0.0s
✔ Image mysql/mysql-server:8.0 Removed 1.1s
✔ Image sail-8.3/app:latest Removed 1.1s
✔ Image sail-8.4/app:latest Removed 1.1s
✔ Network sigiprof-backend_sail Removed

Volvemos a ejecutar el comando ./vendor/bin/sail up

Ahora desde un explorador de bases de datos como lo es TablePlus podemos ver que
nuestra base ha sido creada

[incluir imagen]
