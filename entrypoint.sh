#!/bin/sh
if [ -d "/var/www/html" ]; then
    rm -rf /var/www/html/*
    echo "Existing content in /var/www/html deleted."
else
    echo "/var/www/html does not exist, creating it now."
    mkdir -p /var/www/html
fi

cp -r /app/dist/. /var/www/html
echo "CdsUno resource replication completed."
