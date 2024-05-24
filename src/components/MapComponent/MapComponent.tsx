import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';

interface MapComponentProps {
    lat: number;
    lon: number;
}

export function MapComponent({ lat, lon }: MapComponentProps) {

    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<Map | null>(null);
    const markerRef = useRef<Feature | null>(null);

    useEffect(() => {
        
        if (mapRef.current && !mapInstance.current) {
            mapInstance.current = new Map({
                target: mapRef.current,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    center: fromLonLat([lon, lat]),
                    zoom: 10,
                }),
            });

        } else if (mapInstance.current) {
            const coords = fromLonLat([lon, lat]);
            mapInstance.current.getView().setCenter(coords);
            if (markerRef.current) {
                markerRef.current.setGeometry(new Point(coords));
            }
        }
    }, [lat, lon]);

    return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
}
