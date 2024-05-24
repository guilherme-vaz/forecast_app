import axios from 'axios';
import { useEffect, useState } from 'react';
import './style.css'
import { getMoonPhaseInfo } from '../../helpers/moonPhases';
import { getWeatherIcon } from '../../helpers/typeOfClimate';
import { IWeatherResponse } from '../../interfaces/weather';
import { IConsultaButtonProps } from '../../interfaces/consultaButtonProps';


export function Weather({ onConsultaSuccess }: IConsultaButtonProps) {
    const [city, setCity] = useState<string>('');
    const [weather, setWeather] = useState<IWeatherResponse | null>(null);
    const [error, setError] = useState('');
    const [queries, setQueries] = useState<string[]>([]);
    const [selectedQuery, setSelectedQuery] = useState<string>('');

    const API_KEY_BRASIL_WEATHER = '14537e33'
    const API_KEY_GEOCODING = '7c626b5774cb52b6eb66d978be864f00'

    const handleConsulta = async () => {
        try {
            setError('');

            if (city && !queries.includes(city)) {
                setQueries([...queries, city]);
            }

            // Chamada para OpenWeather Geocoding API
            const geoResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY_GEOCODING}`);
            if (geoResponse.data.length === 0) {
                throw new Error('Cidade não encontrada na OpenWeather');
            }

            const lat = geoResponse.data[0].lat;
            const lon = geoResponse.data[0].lon;

            // Chamada para HG Brasil Weather API para obter dados meteorológicos
            const weatherResponse = await axios.get(`https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY_BRASIL_WEATHER}&lat=${lat}&lon=${lon}`);
            const weatherDataResponse: IWeatherResponse = weatherResponse.data.results;

            if (!weatherDataResponse) {
                throw new Error('Não foi possível localizar as informações da cidade na HG Brasil');
            }

            setWeather(weatherDataResponse);
            onConsultaSuccess(lat, lon);
        } catch (err) {
            setError((err as Error).message);

        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedQuery(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleConsulta();
        }
    };

    let moonPhaseText = '';
    let moonIcon = null;
    if (weather !== null) {
        const { text, icon } = getMoonPhaseInfo(weather.moon_phase);
        moonPhaseText = text;
        moonIcon = icon;
    }

    let weatherText = ''
    let weatherIcon = null;
    if (weather !== null) {
        const { text, icon } = getWeatherIcon(weather.condition_slug);
        weatherText = text;
        weatherIcon = icon;
    }

    useEffect(() => {
        if (selectedQuery) {
            setCity(selectedQuery);
        }
    }, [selectedQuery]);


    return (
        <div className='search_form'>
            <div className='input_button'>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Digite o nome da cidade"
                />
                <button type="button" onClick={handleConsulta}>Consultar</button>
            </div>
            <div>
                <select value={selectedQuery} onChange={handleSelectChange}>
                    <option value="" disabled>
                        Selecione uma consulta anterior
                    </option>
                    {queries.map((q, index) => (
                        <option className='option' key={index} value={q}>
                            {q}
                        </option>
                    ))}
                </select>
            </div>
            {weather && (
                <>
                    <div className='city_info'>
                        <h3 className='title'>Tempo em {weather.city_name}</h3>
                        <div className='text_icon'>
                            <p>Tipo de clima: <span className='bold'>{weatherText}</span></p>
                            {weatherIcon && <img src={weatherIcon} alt="Weather Icon" />}
                        </div>
                        <p>Temperatura máxima: <span className='bold'>{weather.forecast[0].max} °C</span></p>
                        <p>Temperatura mínima: <span className='bold'>{weather.forecast[0].min}°C</span></p>
                        <div className='text_icon'>
                            <p>Fase da Lua: <span className='bold'>{moonPhaseText}</span></p>
                            <img src={moonIcon} alt="imagem da lua" />
                        </div>
                    </div>
                    <div>
                        <h3 className='title'>Próximos dias</h3>

                        <div className='next_days'>
                            {[1, 2, 3].map((index) => {
                                let weatherForecastText = '';
                                let weatherForecastIcon = null;
                                if (weather !== null) {
                                    const { text, icon } = getWeatherIcon(weather.forecast[index].condition);
                                    weatherForecastText = text;
                                    weatherForecastIcon = icon;
                                }
                                return (
                                    <div className='next_day_card' key={index}>
                                        <p><span className='bold'>{weather.forecast[index].weekday} - {weather.forecast[index].date}</span></p>
                                        <p>Temperatura máxima: <span className='bold'>{weather.forecast[index].max}°C</span></p>
                                        <p>Temperatura mínima: <span className="bold">{weather.forecast[index].min}°C</span></p>
                                        <div className='text_icon'>
                                            <p>Clima previsto: <span className="bold">{weatherForecastText}</span></p>
                                            <img src={weatherForecastIcon} alt="ìcone correspondente ao tempo atual" />
                                        </div>
                                        <p>Chance de chuva: <span className="bold">{weather.forecast[index].rain_probability}%</span></p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}