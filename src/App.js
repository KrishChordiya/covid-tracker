import React, { useEffect, useState } from 'react'
import "./App.css"
import InfoBox from "./components/InfoBox/InfoBox"
import $ from 'jquery';
import Map from "./components/Map/Map"
import Table from './components/Table/Table';

function App() {
	const [countries, setCountries] = useState([])
	const [countryInfo, setCountryInfo] = useState({})
	const [dday, setDday] = useState("today")
	const [caseType, setCaseType] = useState("cases")

	//fetch world data
	useEffect(() => {
		fetch(`https://disease.sh/v3/covid-19/all?${dday}=true`)
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data)
			})
	}, [])

	//fetch countries
	useEffect(() => {
		const getCountriesData = async () => {
			await fetch(`https://disease.sh/v3/covid-19/countries?${dday}=true
			`)
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country, index) => (
						{
							id: index,
							name: country.country,
							lat: country.countryInfo.lat,
							long: country.countryInfo.long,
							todayCases: country.todayCases,
							cases: country.cases,
							deaths: country.deaths,
							todayDeaths: country.todayDeaths,
							recovered: country.recovered,
							todayRecovered: country.todayRecovered,
							flag: country.countryInfo.flag
						}
					))
					setCountries(countries)
				})
		}

		getCountriesData()
	}, [dday])

	$('.infoBox__body').on("click", function () {
		setCaseType($(this).children().children("h4").html().toLowerCase().toString())
	})

	const change = async () => {
		const day = $("#dayOptions option:selected").val()
		setDday(day)
		const country = $("#countryOptions option:selected").val()

		if (country === "worldwide") {
			const url = `https://disease.sh/v3/covid-19/all?${day}=true`
			await fetch(url)
				.then(response => response.json())
				.then((data) => (
					setCountryInfo(data)
				))
		} else {
			const url = `https://disease.sh/v3/covid-19/countries/${country}?${day}=true&strict=true`
			await fetch(url)
				.then(response => response.json())
				.then((data) => (
					setCountryInfo(data)
				))
		}
	}

	return (
		<div className="app">
			<h1 className="app__header">Covid-19 Tracker</h1>
			<div className="app__option">
				<select id="countryOptions" variant="outlined" onChange={change}>
					<option value="worldwide">Worldwide</option>
					{countries.map((country) => (
						<option key={country.id} value={country.value}>{country.name}</option>
					))}
				</select>
			</div>
			<div className="app__option" id="dayOptions">
				<select variant="outlined" onChange={change}>
					<option value="today">Today</option>
					<option value="yesterday">Yesterday</option>
					<option value="twoDaysAgo">2 Days ago</option>
				</select>
			</div>
			<div className="app__phase1">
				<div className="app__infoBoxes">
					<InfoBox
						header="Cases"
						classname="infoBox__red"
						data={countryInfo.todayCases}
						allData={countryInfo.cases}
						classname="infoBox__red"
						divclass={caseType == "cases" ? "active__red" : null}
					/>
					<InfoBox
						header="Recovered"
						classname="infoBox__red"
						data={countryInfo.todayRecovered}
						allData={countryInfo.recovered}
						classname="infoBox__green"
						divclass={caseType == "recovered" ? "active__green" : null}
					/>
					<InfoBox
						header="Deaths"
						classname="infoBox__red"
						data={countryInfo.todayDeaths}
						allData={countryInfo.deaths}
						classname="infoBox__red"
						divclass={caseType == "deaths" ? "active__red" : null}
					/>
				</div>
				<Map countries={countries} caseType={caseType} />
				<Table countries={countries} />
			</div>
			<div className="footer">
				<h3>Developed By Krish Chordiya(KC), Nashik, Maharastra, India</h3>
			</div>
		</div>
	)
}

export default App
