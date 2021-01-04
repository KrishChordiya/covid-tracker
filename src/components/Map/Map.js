import React, { useEffect, useState } from 'react'
// import ReactMapGL, { Marker, NavigationControl, Popup, StaticMap } from "react-map-gl"
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet'
import "./Map.css"
import { formatNumber } from "../../App"
import 'leaflet/dist/leaflet.css';
import { popup } from 'leaflet';

function Map({ countries, caseType }) {

    const circlePopup = (countries, type) => {
        if (type == "cases") {
            return (
                countries.map((country) => (
                    <Circle
                        center={[country.lat, country.long]}
                        color="blue"
                        fillColor="blue"
                        fillOpacity={0.4}
                        radius={
                            Math.sqrt(country.cases) * 230
                        }
                    >
                        <Popup>
                            <div><img src={country.flag} alt="" /></div>
                            <div className="map__popupOption">
                                <h4>Country:- </h4>
                                <p>{country.country}</p>
                            </div>
                            <div className="map__popupOption">
                                <h4>Total Cases:- </h4>
                                <p>{formatNumber(country.cases)}</p>
                            </div>
                            <div className="map__popupOption">
                                <h4>Today Cases:- </h4>
                                <p>{formatNumber(country.todayCases)}</p>
                            </div>
                        </Popup>
                    </Circle>
                ))
            )
        }

        if (type == "recovered") {
            return (
                countries.map((country) => (
                    <Circle
                        center={[country.lat, country.long]}
                        color="blue"
                        fillColor="blue"
                        fillOpacity={0.4}
                        radius={
                            Math.sqrt(country.recovered) * 300
                        }
                    >
                        <Popup>
                            <div><img src={country.flag} alt="" /></div>
                            <div className="map__popupOption">
                                <h4>Country:- </h4>
                                <p>{country.country}</p>
                            </div>
                            <div className="map__popupOption">
                                <h4>Total Recovered:- </h4>
                                <p>{formatNumber(country.recovered)}</p>
                            </div>
                            <div className="map__popupOption">
                                <h4>Today Recovered:- </h4>
                                <p>{formatNumber(country.todayRecovered)}</p>
                            </div>
                        </Popup>
                    </Circle>
                ))
            )
        }

        if (type == "deaths") {
            return (
                countries.map((country) => (
                    <Circle
                        center={[country.lat, country.long]}
                        color="blue"
                        fillColor="blue"
                        fillOpacity={0.4}
                        radius={
                            Math.sqrt(country.deaths) * 900
                        }
                    >
                        <Popup>
                            <div><img src={country.flag} alt="" /></div>
                            <div className="map__popupOption">
                                <h4>Country:- </h4>
                                <p>{country.country}</p>
                            </div>
                            <div className="map__popupOption">
                                <h4>Total Deaths:- </h4>
                                <p>{formatNumber(country.deaths)}</p>
                            </div>
                            <div className="map__popupOption">
                                <h4>Today Deaths:- </h4>
                                <p>{formatNumber(country.todaydeaths)}</p>
                            </div>
                        </Popup>
                    </Circle>
                ))
            )
        }
    }

    // const [selectedCountry, setSelectedCountry] = useState(null)

    return (
        <div className="map">
            <MapContainer center={[51.505, -0.09]} zoom={2}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {circlePopup(countries, caseType)}

            </MapContainer>
        </div >
    )
}

export default Map
