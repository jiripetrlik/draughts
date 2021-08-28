FROM node:current AS frontend-builder

COPY frontend/src /frontend/src
COPY frontend/public /frontend/public
COPY frontend/package.json frontend/tsconfig.json frontend/yarn.lock /frontend/

RUN yarn --cwd /frontend
RUN yarn --cwd /frontend build

FROM golang:1.17-alpine AS backend-builder

COPY backend /backend
COPY --from=frontend-builder /frontend/build /backend/static/content
WORKDIR /backend
RUN go build

FROM alpine:latest

COPY --from=backend-builder /backend/draughts-react-go /draughts-react-go
EXPOSE 8080
CMD [ "/draughts-react-go" ]
