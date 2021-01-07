import React from 'react'
import "./Map.css"
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { formatNumber } from "../../utli"

function Map({ countries, caseType }) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const types = {
        cases: {
            zoom: 300
        },
        recovered: {
            zoom: 270
        },
        deaths: {
            zoom: 250
        }
    }

    return (
        <div className="map">
            <MapContainer center={[51.505, -0.09]} zoom={2}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {countries.map((country) => (
                    <Circle
                        key={country.id}
                        center={[country.lat, country.long]}
                        color="blue"
                        fillColor="blue"
                        fillOpacity={0.4}
                        radius={
                            Math.sqrt(country.recovered) * types[`${caseType}`].zoom
                        }
                    >
                        <Popup>
                            <div><img src={country.flag} alt="" /></div>
                            <div className="map__popupOption">
                                <h4>Country:- </h4>
                                <p>{country.name}</p>
                            </div>
                            <div className="map__popupOption">
                                <h4>Total {capitalizeFirstLetter(caseType)}:- </h4>
                                <p>{formatNumber(country[`${caseType}`])}</p>
                            </div>
                            <div className="map__popupOption">
                                <h4>Today {capitalizeFirstLetter(caseType)}:- </h4>
                                <p>{formatNumber(country[`today${capitalizeFirstLetter(caseType)}`])}</p>
                            </div>
                        </Popup>
                    </Circle>
                ))}
            </MapContainer>
        </div>
    )
}

export default Map
