import React from 'react'
import "./InfoBox.css"

function InfoBox(props) {
	const { header, data, totalData, classname, divclass } = props;

	return (
		<div className="infoBox__body">
			<div className={divclass}></div>
			<div className="infoBox__main">
				<h4>{header}</h4>
				<h2 className={classname}>+{data}</h2>
				<p>{totalData} in Total</p>
			</div>
		</div>
	)
}

export default InfoBox