from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AgriTrade API"
    API_V1_STR: str = "/api/v1"
    
    POSTGRES_SERVER: str = "postgres"
    POSTGRES_USER: str = "user"
    POSTGRES_PASSWORD: str = "password"
    POSTGRES_DB: str = "agritrade"
    DATABASE_URL: str | None = None

    class Config:
        case_sensitive = True

settings = Settings()
