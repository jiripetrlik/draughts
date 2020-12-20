all: frontend/build/index.html backend/draughts-react-go

frontend/build/index.html:
	yarn --cwd frontend
	yarn --cwd frontend build

backend/static/content/index.html:
	rm -rf backend/static/content
	mkdir backend/static/content
	cp -r frontend/build/* backend/static/content

backend/draughts-react-go: backend/static/content/index.html
	cd backend; go build

clean:
	rm -rf frontend/build backend/draughts-react-go backend/static/content
