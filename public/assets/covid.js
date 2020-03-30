let countries = []

document.querySelector('#date').textContent = moment().format('DD-MMM-YYYY')
document.querySelectorAll('input[name="sort-order"]').forEach(radio => radio.addEventListener('change', () => {

  switch (radio.value) {
    case 'country':
      sortByCountry()
      displayCountries(true)
      break
    case 'cases':
      sortByCases()
      displayCountries()
      break
    case 'deaths':
      sortByDeaths()
      displayCountries()
      break
    case 'recovered':
      sortByRecovered()
      displayCountries()
      break
    default:
      sortByCountry()
      displayCountries(true)
  }



}))

const createItem = data => {

  const el = document.createElement('div')
  el.className = 'country'

  const header = document.createElement('div')
  header.className = 'header'
  const headerContent = document.createTextNode(data.country)
  header.appendChild(headerContent)

  const content = document.createElement('div')
  content.className = 'content'

  const cases = document.createElement("div")
  cases.className = "data-item"
  let cases_change = data.cases - data.yd_cases
  if (cases_change > 0) {
    cases_change = `+${cases_change}`
  } else {
    cases_change = 'No change'
  }
  cases.innerHTML = `Cases: ${data.cases}`
  cases.innerHTML += `<span class="yd">(${data.yd_cases})</span>`
  cases.innerHTML += `<span class="change">${cases_change}</span>`

  const deaths = document.createElement('div')
  deaths.className = 'data-item'
  let deaths_change = data.deaths - data.yd_deaths
  if (deaths_change > 0) {
    deaths_change = `+${deaths_change}`
  } else {
    deaths_change = 'No change'
  }
  deaths.innerHTML = `Deaths: ${data.deaths}`
  deaths.innerHTML += `<span class="yd">(${data.yd_deaths})</span>`
  deaths.innerHTML += `<span class="change">${deaths_change}</span>`

  const recovered = document.createElement('div')
  recovered.className = 'data-item'
  let recovered_change = data.recovered - data.yd_recovered
  if (recovered_change > 0) {
    recovered_change = `+${recovered_change}`
  } else {
    recovered_change = 'No change'
  }
  recovered.innerHTML = `Recovered: ${data.recovered}`
  recovered.innerHTML += `<span class="yd">(${data.yd_recovered})</span>`
  recovered.innerHTML += `<span class="change">${recovered_change}</span>`

  el.appendChild(header)
  content.appendChild(cases)
  content.appendChild(deaths)
  content.appendChild(recovered)
  el.appendChild(content)

  return el

}

const sortByCountry = () => {

  countries.sort((a, b) => {
    if (a.country < b.country)
      return -1;
    if (a.country > b.country)
      return 1;
    return 0;
  })

}
const sortByCases = () => {

  countries.sort((a, b) => {
    if (a.cases > b.cases)
      return -1;
    if (a.cases < b.cases)
      return 1;
    return 0;
  })

}
const sortByDeaths = () => {

  countries.sort((a, b) => {
    if (a.deaths > b.deaths)
      return -1;
    if (a.deaths < b.deaths)
      return 1;
    return 0;
  })

}
const sortByRecovered = () => {

  countries.sort((a, b) => {
    if (a.recovered > b.recovered)
      return -1;
    if (a.recovered < b.recovered)
      return 1;
    return 0;
  })

}

const displayCountries = (sortByCountry = false) => {

  const container = document.querySelector('.container-covid')
  const alphabet = document.querySelector('.alphabet')

  container.innerHTML = ''
  // if (sortByCountry) {
  // 	alphabet.style.display = 'block'
  // 	let letter = 'A'
  // } else {
  // 	alphabet.style.display = 'none'
  // }
  countries.forEach(country => {
    // 	bookmark = document.createElement('span')
    // 	bookmark.id = letter
    // 	container.appendChild(bookmark)
    const item = createItem(country)
    container.appendChild(item)
  })

}

fetch('https://pomber.github.io/covid19/timeseries.json')
  .then(response => response.json())
  .then(data => {

    const countryData = Object.keys(data)
    countryData.forEach(country => {

      // latestData = data[country].pop()
      const latestData = data[country][data[country].length - 1]
      const yesterdaysData = data[country][data[country].length - 2]

      const thisCountry = {
        country: country,
        cases: latestData.confirmed,
        deaths: latestData.deaths,
        recovered: latestData.recovered,
        yd_cases: yesterdaysData.confirmed,
        yd_deaths: yesterdaysData.deaths,
        yd_recovered: yesterdaysData.recovered
      }

      countries.push(thisCountry)

    })

    sortByCountry()
    displayCountries(true)

  })