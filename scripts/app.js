const cityForm = document.querySelector('form');

const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// update ui
const updateIU = (data) => {
  const { cityDets, weather } = data;

  if (!cityDets || !weather) {
    console.log('no details');
  }

  details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>
    `;

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = '/img/day.svg';
  } else {
    timeSrc = '/img/night.svg';
  }

  time.setAttribute('src', timeSrc);

  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

// update city
const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const cityWeather = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    cityWeather,
  };
};

cityForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((data) => updateIU(data))
    .catch((err) => console.log(err));
});
