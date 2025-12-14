interface IAppConfig {
    PORT: number;
}

interface IRawgConfig {
    RAWG_URL: string;
    RAWG_API_KEY: string;
}

export interface IConfiguration {
    app: IAppConfig;
    rawg: IRawgConfig;
}