FROM node:22 AS builder

COPY ./ /app

WORKDIR /app

RUN npm install
RUN npm run build

FROM busybox:uclibc

COPY --from=builder /app/dist /app/dist
COPY ./entrypoint.sh /app/entrypoint.sh

CMD [ "sh", "/app/entrypoint.sh" ]