import React, { useEffect } from 'react'
import "./Table.css"
import { formatNumber } from "../../App"

function Table({ countries }) {
    useEffect(() => {
        countries.map((country) => {

        })
    }, [])
    return (
        <div className="table">
            <h3>Live Cases By Country</h3>
            <table className="table__main">
                {countries.map((country) => (
                    <tr>
                        <td>{country.country}</td>
                        <td>{formatNumber(country.cases)}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Table
