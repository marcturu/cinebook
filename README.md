# <img src="3-movie-seat-booking/img/movie.svg" alt="MovieLogo" width="100" /> - Cinebook

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)  

<sub>🗓️ Developed in March 2026</sub>

This project consists of three (in)dependent exercises: **/register**, **/rate-exchange-calculator** and **/movie-seat-booking**, each one structured with `index.html`, `style.css` and `script.js`.  

It was intentionally developed using **ES5** syntax and features:

- `var` declarations instead of `let` and `const`.
- Traditional function declarations instead of arrow functions.
- String concatenation using `+` instead of template literals.
- DOM manipulation through native browser APIs.
- Event handling with `addEventListener`.
- Asynchronous API requests using `fetch`.

## ✅ Features

- **/register**: Form with *username*, *email*, *age*, *password*, and *confirm password*, and validators for each field.
- **/rate-exchange-calculator**: Currency exchange calculator with selectable currencies, real-time conversion and exchange rate display using `https://api.exchangerate-api.com/v4/latest/`.
- **/movie-seat-booking**: Interactive movie theater seat booking system for different movies with seat selection, occupancy status and total price calculation (using the *rate exchange calculator* and `localStorage` for *selected movie*, *selected currency* and *selected seats*).

## 🛠 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/marcturu/cinebook.git
```

### 2. Run locally
Open the **index.html** file from each folder with *Live Server* (for example).

## Exercises

### /register (1)
- Validation of `username` between 3 and 15 characters.
- Validation of `email` using a custom `emailRegex`.
- Validation of `age` between 0 and 999 years.
- Validation of `password` with at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character from `ALLOWED_SYMBOLS`.
- Validation of `confirm password` to match `password`.
- The `age` field is treated as `text` instead of `number` to allow proper JavaScript validation (`value` returns `''` when it contains letters).
- Empty fields are checked before applying more specific validations to improve user feedback.

### /rate-exchange-calculator (2)
- Using `Shift+Ctrl+R` makes it easier to observe the loading state with an animated image.

### /movie-seat-booking (3)
- Base prices are in EUR. When changing currency, the API is queried in real time and both the movie select labels and the total price are updated.
- Decimals are excluded for currencies that do not conventionally use them (JPY, KRW, CLP, etc.).
- The loading indicator is a text message, unlike **/rate-exchange-calculator**, which uses an animated image.

---

## 📷 Screenshots 

### Register:
![Register](screenshots/register.png)

### Rate exchange calculator:
![RateExchangeCalculator](screenshots/rate-exchange-calculator.png)  

### Movie seat booking:
![Mobile(MovieSeatBooking)](screenshots/movie-seat-booking.png)
