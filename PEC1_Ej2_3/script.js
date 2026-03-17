/* ----- Elementos DOM ----- */

var theater = document.querySelector('.theater');
var seats = document.querySelectorAll('.row .seat:not(.occupied)');
var count = document.getElementById('count');
var total = document.getElementById('total');
var movie = document.getElementById('movie'); 
var currencySelect = document.getElementById('currency');
var rateDisplay = document.getElementById('rate-display');
var currencySymbol = document.getElementById('currency-symbol');

/* ----- Variables globales ----- */

var BASE_CURRENCY = 'EUR';
var exchangeRate = 1;
var currentCurrency = 'EUR';
var ticketPrice;

var MOVIE_NAMES = {
  '10': 'Avengers: Endgame',
  '12': 'Joker',
  '8': 'Toy Story 4',
  '9': 'The Lion King'
};

/* ----- Funciones de moneda  ----- */

function formatPrice(euros) {
  var converted = euros * exchangeRate;
 
  var noDecimals = ['JPY', 'KRW', 'CLP', 'IDR', 'VND', 'HUF', 'PYG', 'ISK', 'KZT', 'COP', 'DOP']; // Monedas que no usan decimales. Así evitamos 1000.23 JPY, por ejemplo
  var decimals = noDecimals.indexOf(currentCurrency) !== -1 ? 0 : 2;
 
  return converted.toFixed(decimals);
}

function updateMovieLabels() {
  var options = movie.querySelectorAll('option');
  options.forEach(function(option) {
    var priceBase = parseFloat(option.value);
    var name = MOVIE_NAMES[option.value] || option.value;
    option.textContent = name + ' (' + formatPrice(priceBase) + ' ' + currentCurrency + ')';
  });
 
  currencySymbol.textContent = ' ' + currentCurrency;
}
 
function setRateDisplay(status, text) {
  rateDisplay.textContent = text;
  rateDisplay.className = 'rate-display ' + status;
}

/* ----- Funciones de pelicula -----  */

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('movieIndex', movieIndex);
  localStorage.setItem('moviePrice', moviePrice);
}

function updateSelectedSeats() {
  var selectedSeats = document.querySelectorAll('.row .seat.selected');

  var seatsIndex = [...selectedSeats].map(function(seat) {
    return [...seats].indexOf(seat);
  })
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  var selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = formatPrice(selectedSeatsCount * ticketPrice);
}

function fillUI() {
  var selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach(function(seat, index) {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    })
  }

  var movieIndex = localStorage.getItem('movieIndex');
  if (movieIndex !== null) {
    movie.selectedIndex = movieIndex;
  }

  var currency = localStorage.getItem('currency');
  if (currency !== null) {
    currencySelect.value = currency;
  }
}

/* ----- Función API ----- */

function fetchExchangeRate(targetCurrency) {
 
  if (targetCurrency === BASE_CURRENCY) {
    exchangeRate    = 1;
    currentCurrency = BASE_CURRENCY;
    setRateDisplay('ready', 'Base currency (1:1)');
    updateMovieLabels();
    updateSelectedSeats();
    return;
  }
 
  setRateDisplay('loading', 'Loading...');
 
  fetch('https://api.exchangerate-api.com/v4/latest/' + BASE_CURRENCY)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Error ' + response.status + ': ' + response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      var rate = data.rates[targetCurrency];
 
      if (!rate) {
        throw new Error('Currency not found: ' + targetCurrency);
      }
 
      exchangeRate    = rate;
      currentCurrency = targetCurrency;
 
      setRateDisplay('ready', '1 ' + BASE_CURRENCY + ' = ' + rate.toFixed(4) + ' ' + targetCurrency);
 
      updateMovieLabels();     
      updateSelectedSeats();   
    })
    .catch(function(error) {
      setRateDisplay('error', 'Error fetching rate');
      console.error('Exchange rate error:', error.message);
    });
}

/* ----- Event listeners ----- */

currencySelect.addEventListener('change', function(e) {
  localStorage.setItem('currency', e.target.value);
  fetchExchangeRate(e.target.value);
});

movie.addEventListener('change', function (e) {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedSeats();
});

theater.addEventListener('click', function (e) {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedSeats();
  }
});

/* ----- Inicio ----- */
fillUI();
ticketPrice = +movie.value;
var savedCurrency = localStorage.getItem('currency') || 'EUR';
fetchExchangeRate(savedCurrency);