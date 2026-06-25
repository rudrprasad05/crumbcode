# syntax=docker/dockerfile:1

ARG DOTNET_VERSION=8.0

FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_VERSION}-bookworm-slim AS restore
WORKDIR /src

COPY CrumbCodeBackend.csproj ./
RUN dotnet restore

FROM restore AS publish
COPY . ./
RUN dotnet publish CrumbCodeBackend.csproj \
    --configuration Release \
    --no-restore \
    --output /app/publish \
    -p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:${DOTNET_VERSION}-bookworm-slim AS runtime
WORKDIR /app

ENV ASPNETCORE_ENVIRONMENT=Production \
    ASPNETCORE_URLS=http://+:5080 \
    Backend__Url=http://+:5080 \
    DOTNET_EnableDiagnostics=0

COPY --from=publish /app/publish .

EXPOSE 5080
ENTRYPOINT ["dotnet", "CrumbCodeBackend.dll"]
