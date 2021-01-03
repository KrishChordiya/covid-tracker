import React, { useState } from 'react'
import ReactMapGL, { Marker, NavigationControl, Popup } from "react-map-gl"
import "./Map.css"
import { formatNumber } from "../../App"

function Map({ countries }) {

    const [viewport, setViewport] = useState({
        latitude: 20,
        longitude: 77,
        width: "100%",
        height: "100%",
        zoom: 2
    });

    const [selectedCountry, setSelectedCountry] = useState(null)

    return (
        <div className="map">
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken="pk.eyJ1IjoiaGV5aWJhajQzNiIsImEiOiJja2pkeHFvMzEwdjZuMnluemg1dGwwdzM3In0.1XM3tieqtfSg5O9VC4EeRg"
                // mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >
                <NavigationControl />
                {
                    countries.map((country) => (
                        <Marker latitude={country.lat} longitude={country.long}>
                            <img src={country.flag} alt="" className="map__marker" onClick={(e) => {
                                e.preventDefault()
                                setSelectedCountry(country)
                            }} />
                        </Marker>
                    ))
                }
                {
                    selectedCountry ? (
                        <Popup latitude={selectedCountry.lat} longitude={selectedCountry.long} onClose={() => {
                            setSelectedCountry(null)
                        }}>
                            <div className="map__markerOption">
                                <h5>Country:- </h5>
                                <p>{selectedCountry.country}</p>
                            </div>
                            <div className="map__markerOption">
                                <h5>Today Cases:- </h5>
                                <p>{formatNumber(selectedCountry.todayCases)}</p>
                            </div>
                            <div className="map__markerOption">
                                <h5>Today Recovered:- </h5>
                                <p>{formatNumber(selectedCountry.todayRecovered)}</p>
                            </div>
                            <div className="map__markerOption">
                                <h5>Today Deaths:- </h5>
                                <p>{formatNumber(selectedCountry.todayDeaths)}</p>
                            </div>
                        </Popup>
                    ) : null
                }

            </ReactMapGL>
        </div >
    )
}

export default Map
