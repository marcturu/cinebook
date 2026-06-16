# <img src="movie-seat-booking/img/movie.svg" alt="MovieLogo" width="100" /> - Cinebook

![JavaScript](https://img.shields.io/badge/JavaScript-ES5-yellow)  
<sub>🗓️ Developed in March 2026</sub>

This project consists of three (in)dependent exercises: **/register**, **/rate-exchange-calculator** and **/movie-seat-booking**, each one structured with `index.html`, `style.css` and `script.js`.  
It was coded using ES5 intentionally, which implies string concatenation using `+` instead of template literals, `var` instead of `const` / `let`. and functions declared with `function` instead of arrow functions.  

## ✅ Features

- **/register**: Form with *username*, *email*, *age*, *password*, and *confirm password*, and validators for each field.
- **/rate-exchange-calculator**: Currency exchange calculator with selectable currencies, real-time conversion and exchange rate display using `https://api.exchangerate-api.com/v4/latest/`.
- **/movie-seat-booking**: Interactive movie theater seat booking system for different movies with seat selection, occupancy status and total price calculation (using the *rate exchange calculator* and `localStorage`).

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
- Validation of `age` between 0 and 100 years.
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
