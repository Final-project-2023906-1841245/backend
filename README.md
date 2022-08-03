# MANDE
Mande, es una aplicación que permite, conseguir personas trabajadoras, expertas y honestas para realizar a domicilio labores del día a día en el hogar.  

# Pasos para levantar el backend y la base de datos

---

### Base de datos:

1- Declare la variable de entorno con el nombre que desee:

```
USER_NAME=sdrivert
```

2- Ubíquese dentro del directorio DockerPostgres, este se encuentra dentro de la carpeta backend y ejecute el siguiente comando para generar la imagen de la base de datos:

```
docker build -t ${USER_NAME}/mande_db .
```

3- Ejecute el siguiente comando para crear un contenedor postgres que incluya el esquema y los datos de la base de datos:

```
docker run --name mande_db -p 5432:5432 -e POSTGRES_PASSWORD=pg123 -d ${USER_NAME}/mande_db
```

En caso de que se produzca un error “address already in use” durante la creación del contenedor ejecute el siguiente comando para encuentrar el pid del proceso que ocupa el puerto:

```
sudo ss -lptn 'sport = :5432'
```

Después ejecute el siguiente comando para matar el proceso que ya tiene ocupado el puerto:

```
sudo kill pid
```

#### Usar la aplicación gráfica pgadmin4 (opcional):

4- Ejecute el siguiente comando para crear contenedor que corra la consola de comandos de postgres (psql):

```
sudo docker run -it --rm --link mande_db:mande_db postgres:12  psql -h mande_db -U postgres
```

5- Ejecute el siguiente comando para crear contenedor que corra la interfaz gráfica para manejar postgres (pgadmin4):

```
sudo docker run --rm -p 5050:80 --link mande_db:mande_db -e "PGADMIN_DEFAULT_EMAIL=admin@admin.com" -e "PGADMIN_DEFAULT_PASSWORD=pg123" -d dpage/pgadmin4
```

###### Información importante base de datos:

Nombre de la base de datos: mande_db
Host de la base de datos: mande_db
Usuario: postgres
Contraseña: pg123
Puerto: 5432

---

### Backend:

1- No olvidar declarar la variable de entorno si ha cambiado de terminal:

```
USER_NAME=sdrivert
```

2- Ubíquese dentro del directorio backend y ejecute el siguiente comando para generar la imagen del backend:

```
docker build -t ${USER_NAME}/mande_backend   .
```

3- Finalmente ejecute el siguiente comando para crear un contenedor que corra el backend (Recuerde hacerlo en la carpeta backend):

```
docker run -it --rm -p 5000:5000 --link mande_db:postgres --name mande_app -v $(pwd):/app ${USER_NAME}/mande_backend
```
