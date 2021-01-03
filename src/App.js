import React, { useEffect, useState } from 'react'
import "./App.css"
import InfoBox from './components/InfoBox/InfoBox'
import Map from './components/Map/Map'
import Table from './components/Table/Table'
import * as numeral from "numeral"

export function formatNumber(i) {
	return numeral(i).format('0,0')
}

function App() {
	const [countries, setCountries] = useState([])
	const [country, setCountry] = useState("worldwide")
	const [countryInfo, setCountryInfo] = useState({})
	const [tableData, setTableData] = useState([])

	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data)
			})
	}, [])

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
			<div className="app__phase1">
				<div className="app__infoBoxes">
					<InfoBox header="Cases" newCases={formatNumber(countryInfo.todayCases)} classes="infoBox__red" totalCases={formatNumber(countryInfo.cases)} />
					<InfoBox header="Recovered" newCases={formatNumber(countryInfo.todayRecovered)} classes="infoBox__green" totalCases={formatNumber(countryInfo.recovered)} />
					<InfoBox header="Deaths" newCases={formatNumber(countryInfo.todayDeaths)} classes="infoBox__red" totalCases={formatNumber(countryInfo.deaths)} />
				</div>
				<Map countries={countries} />
				<Table countries={tableData} />
			</div>
		</div>
	)
}

export default App