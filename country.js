const countryInfo = document.getElementById('country-info');
const goBack = document.getElementById('goBack');

const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('country');
const countryCode = urlParams.get('code');

console.log('Country:', countryName);
console.log('Code:', countryCode);

// Функция для получения параметра из URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function getCountryInfo() {
    const countryName = getQueryParam('country');
    console.log('Country from URL:', countryName);
    if (!countryName) {
        console.log('No country name found in URL');
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();

        console.log('Full data:', data);

        if (!data || data.status === 404 || !Array.isArray(data) || data.length === 0) {
            console.log('Country not found');
            countryInfo.innerHTML = '<p>Country not found.</p>';
            return;
        }

        const country = Array.isArray(data[0]) ? data[0][0] : data[0];

        console.log('Country object:', country);

        const currency = country.currencies 
            ? Object.values(country.currencies)[0] 
            : null;

        countryInfo.innerHTML = `
            <h1>${country.name.common}</h1>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}" width="500">
            <p>Capital: ${country.capital ? country.capital[0] : 'No capital'}</p>
            <p>Population: ${country.population.toLocaleString()}</p>
            <p>Region: ${country.region}</p>
            <p>Languages: ${country.languages ? Object.values(country.languages).join(', ') : 'No languages info'}</p>
            <p>Currency: ${currency ? currency.name : 'No currency'} (${currency && currency.symbol ? currency.symbol : ''})</p>
        `;
    } catch (error) {
        console.log('Error fetching country data:', error);
        countryInfo.innerHTML = '<p>Failed to load country data.</p>';
    }
}

// Функция для кнопки "Назад"
function goBackk() {
    window.history.back();
}

goBack.addEventListener('click', goBackk);

getCountryInfo();
