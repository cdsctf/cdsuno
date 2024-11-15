FROM node:20 AS builder

COPY ./web /app
    
WORKDIR /app
    
RUN npm install
RUN npm run build

FROM scratch

COPY --from=builder /app/dist /app