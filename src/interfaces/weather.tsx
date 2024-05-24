export interface IWeatherResponse {
    city_name: string;
    condition_slug: string;
    forecast: { max: number; min: number; date: string | null, weekday: string | null, condition: string | null, rain_probability: number | null }[];
    moon_phase: string;
}