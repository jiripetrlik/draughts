all: frontend/build/index.html backend/draughts-react-go

frontend/build/index.html:
	yarn --cwd frontend
	yarn --cwd frontend build

backend/draughts-react-go:
	cd backend; go build

clean:
	rm -rf frontend/build backend/draughts-react-go
