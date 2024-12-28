---
title: "Resolviendo Problemas Con Laravel Sail en mi Mac Mini M4"
description: "En este post hablo acerca de Laravel Sail y cómo solucioné algunos problemas
de compatibilidad que surgieron al intentar ejecutar un antiguo proyecto en mi nueva Mac 
Mini M4."
date: 2024-12-12
slug: laravel-sail-mac-mini
---

# Diagnóstico del Error

Si bien Laravel Sail ha funcionado con éxito en mis proyectos pasados, ahora
que he cambiado de computadora, al intentar levantar un proyecto usando el mismo
comando de siempre `./vendor/bin/sail up`, me encuentro con el siguiente error
en mi consola:

```shell
./vendor/bin/sail up
[+] Running 1/1
 ✘ mysql Error     no matching manifest for linux/arm64/v8 in the manifest list entries: no match for platform in manifest: not found
```

# ¿Qué es Laravel Sail?

Si estás familiarizado con [Laravel](https://laravel.com/), probablemente hayas
escuchado sobre [Laravel Sail](https://laravel.com/docs/11.x/sail). Para quienes
no lo conocen, Laravel Sail es una herramienta proporcionada por la comunidad de
Laravel que, en teoría, nos facilita el proceso de configurar un proyecto en
nuestra computador haciendo uso de [Docker](<https://en.wikipedia.org/wiki/Docker_(software)>).

Cuando desarrollas un proyecto con Laravel, es necesario configurar una base de
datos: crearla, asignarle un usuario, establecer una contraseña, iniciar el
servicio, y luego editar el archivo `.env` para añadir las credenciales
correspondientes. Después, debes levantar el proyecto y esperar que todo
funcione correctamente (a veces no sin antes cruzar los dedos).

Aunque existen herramientas como [Laragon](https://laragon.org/), [Laradock](https://laradock.io/),
[Lando](https://docs.lando.dev/plugins/laravel/), entre otras, que simplifican
este proceso, ninguna parece integrar todo de forma tan eficiente y directa como
Laravel Sail.

# Entendiendo el Problema

La mención de **“arm64”** en el mensaje de error me hizo sospechar que el problema estaba
relacionado con la [arquitectura](https://es.wikipedia.org/wiki/Microprocesador#Arquitecturas)
de mi nuevo procesador. En mi computadora anterior, equipada con un [Intel Core](https://en.wikipedia.org/wiki/Intel_Core)
i5, Laravel Sail funcionaba sin inconvenientes. Sin embargo, mi nueva máquina, con un [Apple Silicon](https://en.wikipedia.org/wiki/Apple_silicon)
M4, utiliza una arquitectura [ARM64](https://en.wikipedia.org/wiki/AArch64), lo que
introduce diferencias significativas.

Esto implica que las instrucciones que **Docker** empleaba para levantar los servicios en
mi sistema anterior no son compatibles con esta nueva arquitectura. Esto ocurre porque las
[imágenes](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/)
Docker utilizadas por Laravel Sail están diseñadas para arquitecturas específicas,y la
imagen de MySQL que intenta descargar no incluye una versión compatible con ARM64.

# Pasos para Solucionar el Problema

El primer paso fue identificar qué causaba que Docker utilizara imágenes incompatibles con
mi sistema. Al revisar la documentación de Laravel Sail, descubrí que después de
instalarlo en un proyecto, es necesario ejecutar el comando `php artisan sail:install`.

Este comando se encarga de generar el archivo `docker-compose.yml` en la carpeta raíz del
proyecto y de ajustar el archivo `.env`, configurando las variables de entorno para que el
proyecto pueda comunicarse con los servicios que se ejecutan en los contenedores de
Docker.

La configuración de estos [contenedores](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)
, así como las imágenes que utilizan, está definida en el archivo `docker-compose.yml`. Al
inspeccionar este archivo más de cerca, noté que la imagen que Docker utiliza para MySQL
no especifica ninguna información sobre la arquitectura del sistema:

```yml title="docker-compose.yml" collapse={11-25, 33-55}
services:
  laravel.test:
    build:
      context: ./vendor/laravel/sail/runtimes/8.3
      dockerfile: Dockerfile
      args:
        WWWGROUP: "${WWWGROUP}"
    image: sail-8.3/app
    extra_hosts:
      - "host.docker.internal:host-gateway"
    ports:
      - "${APP_PORT:-80}:80"
      - "${VITE_PORT:-5173}:${VITE_PORT:-5173}"
    environment:
      WWWUSER: "${WWWUSER}"
      LARAVEL_SAIL: 1
      XDEBUG_MODE: "${SAIL_XDEBUG_MODE:-off}"
      XDEBUG_CONFIG: "${SAIL_XDEBUG_CONFIG:-client_host=host.docker.internal}"
      IGNITION_LOCAL_SITES_PATH: "${PWD}"
    volumes:
      - ".:/var/www/html"
    networks:
      - sail
    depends_on:
      - mysql
  mysql:
    image: "mysql/mysql-server:8.0"
    ports:
      - "${FORWARD_DB_PORT:-3306}:3306"
    environment:
      MYSQL_ROOT_PASSWORD: "${DB_PASSWORD}"
      MYSQL_ROOT_HOST: "%"
      MYSQL_DATABASE: "${DB_DATABASE}"
      MYSQL_USER: "${DB_USERNAME}"
      MYSQL_PASSWORD: "${DB_PASSWORD}"
      MYSQL_ALLOW_EMPTY_PASSWORD: 1
    volumes:
      - "sail-mysql:/var/lib/mysql"
      - "./vendor/laravel/sail/database/mysql/create-testing-database.sh:/docker-entrypoint-initdb.d/10-create-testing-database.sh"
    networks:
      - sail
    healthcheck:
      test:
        - CMD
        - mysqladmin
        - ping
        - "-p${DB_PASSWORD}"
      retries: 3
      timeout: 5s
networks:
  sail:
    driver: bridge
volumes:
  sail-mysql:
    driver: local
```

## Generar un Nuevo Archivo `docker-compose.yml`

Antes de modificar cualquier línea de código en este archivo, pensé que volver a ejecutar
el comando `php artisan sail:install` podría generar un nuevo archivo `docker-compose.yml`
con la configuración adecuada para mi sistema. Confiando en que este comando sería capaz de
detectar la arquitectura de mi procesador al ejecutarse. Siguiendo esta hipótesis, eliminé
el archivo `docker-compose.yml` existente en mi proyecto y generé uno nuevo utilizando el
mismo comando.

## Eliminar Contenedores y Volúmenes Existentes

Para evitar conflictos entre los contenedores y volúmenes creados previamente con una
configuración incorrecta, ejecuté el comando `./vendor/bin/sail down --rmi all -v`. Este
comando detiene y elimina todos los contenedores, redes, volúmenes e imágenes asociados
con Laravel Sail. Es importante tener cuidado al usarlo, ya que no solo elimina la
información del proyecto actual, sino también todos los elementos relacionados con Laravel
Sail en Docker.

En mi caso, esto no fue un problema porque solo tenía este proyecto en mi sistema. Sin
embargo, si esto representa un inconveniente, una alternativa sería utilizar la interfaz
gráfica de Docker para eliminarlos manualmente.

Al finalizar, ejecuté el comando `./vendor/bin/sail up` para iniciar mi aplicación, y todo
funcionó según lo planeado. Mi aplicación se levantó con éxito, permitiéndome continuar
con su desarrollo.
