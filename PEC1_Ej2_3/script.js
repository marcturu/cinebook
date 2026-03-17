var theater = document.querySelector('.theater');
var count = document.getElementById('count');
var total = document.getElementById('total');
var movie = document.getElementById('movie');

var ticketPrice = +movie.value;

function updateSelectedSeats() {
  var selectedSeats = document.querySelectorAll('.row .seat.selected');

  var selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

movie.addEventListener('change', function (e) {
  ticketPrice = +e.target.value;
  updateSelectedSeats();
})

theater.addEventListener('click', function (e) {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedSeats();
  }
})