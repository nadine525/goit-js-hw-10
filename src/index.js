import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  countriesList.innerHTML = '';
  countryInfo.innerHTML = '';

  const name = event.target.value.trim();
  console.log(name);

  if (!name) {
    countriesList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
  fetchCountries(name)
    .then(sortOfCountries)
    .catch(error => console.log(error));
}

function sortOfCountries(countries) {
  // console.log(countries);
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countriesList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  } else if (countries.length > 2) {
    countriesList.innerHTML = '';
    return renderMarkupForLotOfCountries(countries);
  } else {
    countryInfo.innerHTML = '';
    return renderMarkupOfOneCountry(countries);
  }
}

function renderMarkupForLotOfCountries(countries) {
  const markup = countries
    .map(country => {
      return `<li>
  <img src="${country.flags.png}" alt="${country.flags.alt}" />
  <p class=country-official>${country.name.official}</p>
</li>`;
    })
    .join('');
  countriesList.innerHTML = markup;
}

function renderMarkupOfOneCountry(countries) {
  const markup = countries
    .map(country => {
      return `<div class="country">
      <img src="${country.flags.png}" alt="${country.flags.alt}" />
      <h2 class="country-name">${country.name.official}</h2>
      <p>Capital: ${country.capital}</p>
      <p>Population: ${country.population}</p>
      <p>Languages: ${Object.values(country.languages)}</p></div>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}

//тестування даних, отриманих зарізними видами запитів
// fetch('https://restcountries.com/v3.1/all')
//   .then(response => {
//     return response.json();
//   })
//   .then(countries => console.log(countries))
//   .catch(error => {
//     console.log(error);
//   });

// fetch(
//   'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages'
// )
//   .then(response => {
//     return response.json();
//   })
//   .then(countries => console.log(countries))
//   .catch(error => {
//     console.log(error);
//   });

// const URL =
//   'https://restcountries.com/v3.1/name/ukraine?fields=name,capital,population,flags,languages';
// fetch(URL)
//   .then(response => {
//     return response.json();
//   })
//   .then(countries => console.log(countries))
//   .catch(error => {
//     console.log(error);
//   });

// function fetchCountries(name) {
//   const URL = `https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages`;

//   return fetch(URL).then(response => {
//     console.log(response);
//     if (!response.ok) {
//       throw new Error(
//         Notiflix.Notify.failure('Oops, there is no country with that name')
//       );
//     }

//     return response.json();
//   });
// }
