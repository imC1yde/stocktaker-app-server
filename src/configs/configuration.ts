import { IConfiguration } from "@src/configs/configuration.interface";

export default (): IConfiguration => ({
    app: {
        PORT: Number(process.env.PORT) || 3000,
    },
    rawg: {
        RAWG_URL: process.env.RAWG_URL || "https://api.rawg.io/api/games",
        RAWG_API_KEY: process.env.RAWG_API_KEY || "7af2c84b290542f89830b1ff23b82982"
    }
})