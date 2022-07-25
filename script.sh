#!/bin/bash
cd ../frontend &&
gnome-terminal -- npm start &&
cd ../backend &&
USER_NAME=sdrivert &&
docker start mande_db &&
gnome-terminal -- docker run -it --rm --link mande_db:mande_db postgres:12  psql -h mande_db -U postgres &&
docker run --rm -p 5050:80 --link mande_db:mande_db -e "PGADMIN_DEFAULT_EMAIL=admin@admin.com" -e "PGADMIN_DEFAULT_PASSWORD=pg123" -d dpage/pgadmin4 &&
gnome-terminal -- docker run -it --rm -p 5000:5000 --link mande_db:postgres --name mande_app -v $(pwd):/app ${USER_NAME}/mande_backend
