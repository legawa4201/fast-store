function getCurrentDate() {
    let now = new Date()
    let getFormat = now.toLocaleTimeString(`id-ID`, { year: `numeric`, month: `numeric`, day: `numeric` }).split(`,`)
    return getFormat[0].split(`/`).join(`-`) + getFormat[1].split(`.`).join(`:`)
}

module.exports = {
    getCurrentDate
}