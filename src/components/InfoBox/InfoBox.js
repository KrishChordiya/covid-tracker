import React from 'react'
import "./InfoBox.css"
import { formatNumber } from "../../utli"

function InfoBox({ header, classname, data, allData, divclass }) {

	return (
		<div className="infoBox__body">
			<div className={divclass}></div>
			<div className="infoBox__main">
				<h4>{header}</h4>
				<h2 className={classname}>+{formatNumber(data)}</h2>
				<p>{formatNumber(allData)} in Total</p>
			</div>
		</div>
	)
}

export default InfoBox