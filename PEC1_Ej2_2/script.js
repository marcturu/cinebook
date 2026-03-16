var currencyOne = document.getElementById('currency-one');
var currencyTwo = document.getElementById('currency-two');
var amountOne = document.getElementById('amount-one');
var amountTwo = document.getElementById('amount-two');
var rate = document.getElementById('rate');

function calculateExchange() {
  fetch('https://api.exchangerate-api.com/v4/latest/' + currencyOne.value)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var dataRate = data.rates[currencyTwo.value];
      amountTwo.value = (amountOne.value * dataRate).toFixed(2);

      rate.innerText = '1 ' + currencyOne.value  + ' = ' + dataRate + ' ' + currencyTwo.value;
    })
}

function swapCurrencies() {
  var temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;

  calculateExchange();
}

/* ----- Event listeners ----- */

currencyOne.addEventListener('change', calculateExchange);
amountOne.addEventListener('input', calculateExchange);
currencyTwo.addEventListener('change', calculateExchange);
amountTwo.addEventListener('input', calculateExchange);

document.getElementById('swap').addEventListener('click', swapCurrencies);

calculateExchange();