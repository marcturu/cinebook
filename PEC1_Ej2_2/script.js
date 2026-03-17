var currencyOne = document.getElementById('currency-one');
var currencyTwo = document.getElementById('currency-two');
var amountOne = document.getElementById('amount-one');
var amountTwo = document.getElementById('amount-two');
var rate = document.getElementById('rate');
var loading = document.getElementById('loading');
var errorMessage = document.getElementById('error-message');
var errorText = document.getElementById('error-text');

/* ----- Utils ----- */

function showLoading() {
  loading.classList.add('visible');
  rate.style.display = 'none';
  errorMessage.classList.remove('visible');
}

function hideLoading() {
  loading.classList.remove('visible');
  rate.style.display = '';
}

function showError(message) {
  errorMessage.classList.add('visible');
  errorText.textContent = message; 
  rate.style.display = 'none';
}

function hideError() {
  errorMessage.classList.remove('visible');
}

/* ----- Validaciones ----- */

function checkNegatives(input) {
  if (input.value !== '' && input.value < 0) {
    input.value = 0;
  }
}

/* ----- Calculos ----- */

function calculateExchange() {
  checkNegatives(amountOne);

  showLoading();

  fetch('https://api.exchangerate-api.com/v4/latest/' + currencyOne.value)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Error ' + response.status + ': ' + response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      hideLoading();
      hideError();

      var dataRate = data.rates[currencyTwo.value];
      if (!dataRate) {
        throw new Error('Currency ' + currencyTwo.value + ' not found');
      }

      amountTwo.value = (amountOne.value * dataRate).toFixed(2);
      rate.innerText = '1 ' + currencyOne.value  + ' = ' + dataRate + ' ' + currencyTwo.value;
    })
    .catch(function(error) {
      hideLoading();
      showError('Couldn\'t get exchange rate: ' + error.message);
      amountTwo.value = '';
    });
}

function swapCurrencies() {
  var temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculateExchange();
}

/* ----- Event listeners ----- */

currencyOne.addEventListener('change', calculateExchange);
currencyTwo.addEventListener('change', calculateExchange);
amountOne.addEventListener('input', function() {
  checkNegatives(amountOne);
  calculateExchange();
});
amountTwo.addEventListener('input', function() {
  checkNegatives(amountTwo);
  calculateExchange();
});
document.getElementById('swap').addEventListener('click', swapCurrencies);

calculateExchange();