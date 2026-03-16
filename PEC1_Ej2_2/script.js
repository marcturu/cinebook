function calculateExchange() {
}

/* ----- Event listeners ----- */

document.getElementById('currency-one').addEventListener('change', calculateExchange);
document.getElementById('amount-one').addEventListener('input', calculateExchange);
document.getElementById('currency-two').addEventListener('change', calculateExchange);
document.getElementById('amount-two').addEventListener('input', calculateExchange);