import React from 'react'
import "./InfoBox.css"

function InfoBox(props) {
	const { header, newCases, totalCases, classes } = props;

	return (
		<div className="infoBox__body">
			<h4>{header}</h4>
			<h2 className={classes}>+{newCases}</h2>
			<p>{totalCases} in Total</p>
		</div>
	)
}

export default InfoBox