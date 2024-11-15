FROM node:20 AS builder

COPY ./ /app
    
WORKDIR /app
    
RUN npm install
RUN npm run build

FROM busybox:uclibc

COPY --from=builder /app/dist /app

CMD [ "sh", "-c", "trap 'exit 0' SIGTERM; while true; do sleep 1; done" ]
