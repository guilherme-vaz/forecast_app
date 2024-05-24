import storm from '../assets/climate icons/storm.svg';
import snow from '../assets/climate icons/snow.svg';
import hail from '../assets/climate icons/hail.svg';
import rain from '../assets/climate icons/rain.svg';
import fog from '../assets/climate icons/fog.svg';
import clear_day from '../assets/climate icons/clear_day.svg';
import clear_night from '../assets/climate icons/clear_night.svg';
import cloud from '../assets/climate icons/cloud.svg';
import cloudly_day from '../assets/climate icons/cloudly_day.svg';
import cloudly_night from '../assets/climate icons/cloudly_night.svg';
import none_day from '../assets/climate icons/none_day.svg';
import none_night from '../assets/climate icons/none_night.svg';

const weatherIcons = {
    storm: { text: 'Tempestade', icon: storm },
    snow: { text: 'Neve', icon: snow },
    hail: { text: 'Granizo', icon: hail },
    rain: { text: 'Chuva', icon: rain },
    fog: { text: 'Neblina', icon: fog },
    clear_day: { text: 'Dia Limpo', icon: clear_day },
    clear_night: { text: 'Noite Limpa', icon: clear_night },
    cloud: { text: 'Nublado', icon: cloud },
    cloudly_day: { text: 'Nublado de Dia', icon: cloudly_day },
    cloudly_night: { text: 'Nublado de Noite', icon: cloudly_night },
    none_day: { text: 'Erro ao Obter mas está de Dia', icon: none_day },
    none_night: { text: 'Erro ao Obter mas está de Noite', icon: none_night },
};

export function getWeatherIcon(weatherCondition) {
    const weatherInfo = weatherIcons[weatherCondition];
    if (weatherInfo) {
        return weatherInfo;
    } else {
        return { text: weatherCondition, icon: null };
    }
}
