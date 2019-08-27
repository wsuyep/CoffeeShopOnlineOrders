docker build -t coffee-shop/node-web-app .
docker run -p 49160:8080 -d --name coffee-shop -e NODE_ENV=production coffee-shop/node-web-app

docker commit coffee-shop coffee-shop-portable-image
docker save coffee-shop-portable-image > ./coffee-shop-portable-image.tar