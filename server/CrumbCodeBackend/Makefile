.PHONY: restore build publish db-migrate db-remove db-update docker-build

IMAGE ?= rudrprasad/crumbcode-api
VERSION ?= dev
PLATFORM ?= linux/amd64

restore:
	dotnet restore CrumbCodeBackend.csproj

build:
	dotnet build CrumbCodeBackend.csproj --configuration Release

publish:
	dotnet publish CrumbCodeBackend.csproj --configuration Release --output publish

db-migrate:
	dotnet ef migrations add $(name)

db-remove:
	dotnet ef migrations remove

db-update:
	dotnet ef database update

docker-build:
	docker build --platform $(PLATFORM) -t $(IMAGE):$(VERSION) .
