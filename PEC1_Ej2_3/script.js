var theater = document.querySelector('.theater');
var seats = document.querySelectorAll('.row .seat:not(.occupied)');
var count = document.getElementById('count');
var total = document.getElementById('total');
var movie = document.getElementById('movie');

fillUI();

var ticketPrice = +movie.value;

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
  total.innerText = selectedSeatsCount * ticketPrice;
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
}

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

updateSelectedSeats();