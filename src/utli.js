import * as numeral from "numeral"

export function formatNumber(i) {
    return numeral(i).format('0,0')
}

export function compare(a, b) {
    return b.cases - a.cases;
}
