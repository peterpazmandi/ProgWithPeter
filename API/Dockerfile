# FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
# WORKDIR /app

# FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
# WORKDIR /src
# COPY ["API/API.csproj", "API/"]
# RUN dotnet restore "API\API.csproj"
# COPY . .
# WORKDIR "/src/API"
# RUN dotnet build "API.csproj" -c Release -o /app/build

# FROM build AS publish
# RUN dotnet publish "API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "API.dll"]

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app

COPY ["API/API.csproj", "API/"]
RUN dotnet restore "API\API.csproj"

COPY . ./
EXPOSE 5000
RUN dotnet publish "API\API.csproj" -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "API.dll"]