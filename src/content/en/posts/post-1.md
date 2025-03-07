---
lang: "en"
slug: "solving-laravel-issues-on-my-mac-mini-m4"
title: "Solving Laravel Sail Issues on My Mac Mini M4"
description:
  "In this post, I discuss Laravel Sail and how I resolved some compatibility issues when
  trying to run an old project on my new Mac Mini M4."
pubDate: 2024-12-12
draft: false
---

# Diagnosing the Issue

While Laravel Sail worked perfectly fine in my past projects, after switching to a new
computer, running the usual command `./vendor/bin/sail` up to start a project led to the
following error in my console:

```shell
./vendor/bin/sail up
[+] Running 1/1
 ✘ mysql Error     no matching manifest for linux/arm64/v8 in the manifest list entries: no match for platform in manifest: not found
```

# What is Laravel Sail?

If you're familiar with [Laravel](https://laravel.com/), you’ve probably heard of
[Laravel Sail](https://laravel.com/docs/11.x/sail). For those who haven’t, Laravel Sail is
a tool provided by the Laravel community that aims to simplify the process of setting up a
project on your machine using [Docker](<https://en.wikipedia.org/wiki/Docker_(software)>).

When developing a Laravel project, setting up a database involves creating it, assigning a
user, setting a password, starting the service, and editing the `.env` file to add the
credentials. Then, you hope everything works (sometimes with fingers crossed).

Although tools like [Laragon](https://laragon.org/), [Laradock](https://laradock.io/), and
[Lando](https://docs.lando.dev/plugins/laravel/), simplify this process, none seem as
streamlined and direct as Laravel Sail.

# Understanding the Problem

The mention of **“arm64”** in the error message made me suspect the issue was related to
the [architecture](https://es.wikipedia.org/wiki/Microprocesador#Arquitecturas) of my new
processor. My previous computer, equipped with an
[Intel Core](https://en.wikipedia.org/wiki/Intel_Core) i5, had no issues running Laravel
Sail. However, my new machine, powered by an
[Apple Silicon](https://en.wikipedia.org/wiki/Apple_silicon) M4, uses an
[ARM64](https://en.wikipedia.org/wiki/AArch64) architecture, which introduces significant
differences.

This means the instructions **Docker** used to start services on my previous system are
incompatible with the new architecture. The issue arises because the Docker
[images](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/)
Laravel Sail tries to download are designed for specific architectures, and the MySQL
image lacks an ARM64-compatible version.

# Steps to Resolve the Issue

## Identifying the Root Cause

The first step was to figure out why Docker was pulling incompatible images. Upon
reviewing the Laravel Sail documentation, I discovered that after installing it in a
project, you need to run the `php artisan sail:install` command.

This command generates the `docker-compose.yml` file in the project’s root folder and
adjusts the `.env` file, configuring the environment variables to allow the project to
communicate with services running in Docker containers.

Inspecting the `docker-compose.yml` file, I noticed that the MySQL image didn’t specify
any system architecture:

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

## Generating a New `docker-compose.yml` File

Instead of manually editing the file, I decided to rerun the `php artisan sail:install`
command to regenerate a `docker-compose.yml` file with the appropriate configuration for
my system. My hypothesis was that the command would detect my processor’s architecture
during execution. I deleted the existing `docker-compose.yml` file and generated a new one
using the same command.

## Removing Existing Containers and Volumes

To avoid conflicts with previously created containers and volumes, I ran
`./vendor/bin/sail down --rmi all -v`. This command stops and removes all containers,
networks, volumes, and images associated with Laravel Sail. Use it cautiously, as it
clears all Laravel Sail-related Docker data. En mi caso, esto no fue un problema porque
solo tenía este proyecto en mi sistema. Sin embargo, si esto representa un inconveniente,
una alternativa sería utilizar la interfaz gráfica de Docker para eliminarlos manualmente.

For me, this wasn’t an issue since I only had one project. If this is problematic, you can
alternatively use Docker’s graphical interface to remove them manually.

After completing these steps, I ran `./vendor/bin/sail up`, and everything worked as
expected. My application started successfully, allowing me to continue its development.
