import React, { useEffect } from 'react'
import "./Table.css"
import { formatNumber, compare } from "../../utli"

function Table({ countries }) {
    const sortedData = countries.sort(compare)

    return (
        <div className="table">
            <h3>Live Cases By Country</h3>
            <table className="table__main">
                {sortedData.map((country) => (
                    <tbody key={country.id}>
                        <tr>
                            <td>{country.name}</td>
                            <td>{formatNumber(country.cases)}</td>
                        </tr>
                    </tbody>
                ))}
            </table>
        </div>
    )
}

export default Table
