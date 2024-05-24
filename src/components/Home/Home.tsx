import { useState } from 'react';
import { Weather } from '../Weather/Weather';
import { MapComponent } from '../MapComponent/MapComponent';
import './style.css'

export function Home() {
    const [position, setPosition] = useState<[number, number]>([51.5074, -0.1278]); 

    const handleConsultaSuccess = (lat: number, lon: number) => {
        setPosition([lat, lon]);
    };

    return (
        <div className='container'>
            <div className='weather'>
                <Weather onConsultaSuccess={handleConsultaSuccess} />
            </div>
            <div className='map'>
                <MapComponent lat={position[0]} lon={position[1]} />
            </div>
        </div>
    );
}