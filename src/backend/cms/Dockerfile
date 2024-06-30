# Troubleshooting
# 1. If error `Unable to load the service index for source https://api.nuget.org/v3/index.json` appears while cooking, do following:
# - Go to Docker Desktop > Setting > Docker Engine
# - Add DNS tag in setting configuration: "dns":["1.1.1.1","8.8.8.8"],

FROM mcr.microsoft.com/dotnet/runtime-deps:8.0-jammy as base
WORKDIR /app
# ENV \
#     DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false \
#     LC_ALL=en_US.UTF-8 \
#     LANG=en_US.UTF-8
# RUN apk add --no-cache \
#     icu-data-full \
#     icu-libs
RUN adduser --disabled-password \
  --home /app \
  --gecos '' dotnetuser && chown -R dotnetuser /app
# RUN apk upgrade musl
USER dotnetuser

FROM mcr.microsoft.com/dotnet/sdk:8.0-jammy AS publish
WORKDIR /src
COPY cms.csproj .
#COPY NuGet.config .
RUN dotnet restore --runtime linux-x64
COPY . .
# Do not use -p:PublishSingleFile=true
# https://github.com/umbraco/Umbraco-CMS/blob/contrib/src/Umbraco.Core/Composing/ReferenceResolver.cs#L64
RUN dotnet publish "cms.csproj" --no-restore \
	-c Release \
	-o /app/publish \
	--runtime linux-x64 \
	--self-contained true \
	-p:PublishSingleFile=false

FROM base AS final
COPY --from=publish /app/publish .
ENTRYPOINT ["./cms"]