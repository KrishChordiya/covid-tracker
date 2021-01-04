import React, { useEffect, useState } from 'react'
import "./App.css"
import InfoBox from './components/InfoBox/InfoBox'
import Map from './components/Map/Map'
import Table from './components/Table/Table'
import * as numeral from "numeral"
import $ from 'jquery'

export function formatNumber(i) {
	return numeral(i).format('0,0')
}

function App() {
	const [countries, setCountries] = useState([])
	const [country, setCountry] = useState("worldwide")
	const [countryInfo, setCountryInfo] = useState({})
	const [tableData, setTableData] = useState([])
	const [caseType, setCaseType] = useState("cases")
	const [day, setDay] = useState("today")

	useEffect(() => {
		fetch(`https://disease.sh/v3/covid-19/all?${day}=true`)
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data)
			})
	}, [day])

	function compare(a, b) {
		return b.cases - a.cases;
	}

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => (
						{
							id: country.countryInfo._id,
							country: country.country,
							value: country.countryInfo.iso3,
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

					const sortedData = data.sort(compare)
					setTableData(sortedData)
					setCountries(countries)
				})
		}

		getCountriesData()
	}, [])

	const onDayChange = async (event) => {
		setDay(event.target.value)
		await fetch(`https://disease.sh/v3/covid-19/countries?${event.target.value}=true`)
			.then((response) => response.json())
			.then((data) => {
				const countries = data.map((country) => (
					{
						id: country.countryInfo._id,
						country: country.country,
						value: country.countryInfo.iso3,
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

				const sortedData = data.sort(compare)
				setTableData(sortedData)
				setCountries(countries)
			})
	}

	const onCountryChange = async (event) => {
		const countryCode = event.target.value;
		setCountry(countryCode)

		if (countryCode === "worldwide") {
			const url = "https://disease.sh/v3/covid-19/all"
			await fetch(url)
				.then(response => response.json())
				.then((data) => (
					setCountryInfo(data)
				))
		} else {
			var foundValue = countries.find(obj => obj.value === countryCode);
			setCountryInfo(foundValue)
		}
	}

	$('.infoBox__body').on("click", function () {
		setCaseType($(this).children().children("h4").html().toLowerCase().toString())
	})

	return (
		<div className="app">
			<h1 className="app__header">Covid-19 Tracker</h1>
			<div className="app__option">
				<select variant="outlined" onChange={onCountryChange} value={country}>
					<option value="worldwide">Worldwide</option>
					{countries.map((country) => (
						<option key={country.id} value={country.value}>{country.country}</option>
					))}
				</select>
			</div>
			<div className="app__option" onChange={onDayChange} value={day}>
				<select variant="outlined">
					<option value="today">Today</option>
					<option value="yesterday">Yesterday</option>
					<option value="twoDaysAgo">2 Days ago</option>
				</select>
			</div>
			<div className="app__phase1">
				<div className="app__infoBoxes">
					<InfoBox
						header="Cases"
						data={formatNumber(countryInfo.todayCases)} classname="infoBox__red"
						totalData={formatNumber(countryInfo.cases)}
						divclass={caseType == "cases" ? "active__red" : null}
					/>

					<InfoBox
						header="Recovered"
						data={formatNumber(countryInfo.todayRecovered)} classname="infoBox__green"
						totalData={formatNumber(countryInfo.recovered)}
						divclass={caseType == "recovered" ? "active__green" : null}
					/>

					<InfoBox header="Deaths"
						data={formatNumber(countryInfo.todayDeaths)} classname="infoBox__red"
						totalData={formatNumber(countryInfo.deaths)}
						divclass={caseType == "deaths" ? "active__red" : null}
					/>
				</div>
				<Map countries={countries} caseType={caseType} />
				<Table countries={tableData} />
			</div>
			<div className="footer">
				<h3>Developed By Krish Chordiya(KC), Nashik, Maharastra, India</h3>
			</div>
		</div >
	)
}

export default App