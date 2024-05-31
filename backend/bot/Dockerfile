# Troubleshooting
# 1. If error `Unable to load the service index for source https://api.nuget.org/v3/index.json` appears while cooking, do following:
# - Go to Docker Desktop > Setting > Docker Engine
# - Add DNS tag in setting configuration: "dns":["1.1.1.1","8.8.8.8"],

FROM mcr.microsoft.com/dotnet/runtime-deps:7.0-alpine as base
WORKDIR /app
EXPOSE 80
# create a new user and change directory ownership
RUN adduser --disabled-password \
  --home /app \
  --gecos '' dotnetuser && chown -R dotnetuser /app

# upgrade musl to remove potential vulnerability
RUN apk upgrade musl

# impersonate into the new user
USER dotnetuser

FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS publish
WORKDIR /src

COPY bot.csproj .
RUN dotnet restore --runtime alpine-x64
COPY . .

WORKDIR "/src/."
RUN dotnet publish "bot.csproj" --no-restore \
	-c Release \
	-o /app/publish \
	--runtime alpine-x64 \ 
	--self-contained true \
	-p:PublishSingleFile=true

FROM base AS final

COPY --from=publish /app/publish .
ENTRYPOINT ["./bot"]