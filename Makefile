all: frontend/build/index.html backend/draughts-react-go

frontend/build/index.html:
	yarn --cwd frontend
	yarn --cwd frontend build

backend/static-site/index.html:
	rm -rf backend/static-site
	mkdir backend/static-site
	cp -r frontend/build/* backend/static-site

backend/draughts-react-go: backend/static-site/index.html
	cd backend; go build

clean:
	rm -rf frontend/build backend/draughts-react-go backend/static-site
