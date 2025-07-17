# Use the official .NET 8 SDK to build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the source
COPY . ./
RUN dotnet publish -c Release -o /out

# Use the ASP.NET Core runtime for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /out ./

# Set the port the container will listen on
ENV ASPNETCORE_URLS=http://+:5193
EXPOSE 5193

ENTRYPOINT ["dotnet", "CrumbCodeBackend.dll"]
