import Notiflix from 'notiflix';

function fetchCountries(name) {
  const filterFields = 'name,capital,population,flags,languages';
  const url = `https://restcountries.com/v3.1/name/${name}?fields=${filterFields}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
    return response.json();
  });
}

fetch('https://restcountries.com/v3.1/all')
  .then(response => {
    return response.json();
  })
  .then(countries => console.log(countries))
  .catch(error => {
    console.log(error);
  });
