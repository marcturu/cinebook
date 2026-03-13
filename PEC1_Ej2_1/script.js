/* ----- Utils ----- */

function getEl(id) {
  return document.getElementById(id);
}

function getRule(rule) {
  return document.getElementById('rule-' + rule);
}

function getSection(section) {
  return document.getElementById('section-' + section);
}

function setFeedback(sectionId, message, isValid) {
  var section = getSection(sectionId);
  var feedback = section.querySelector('.feedback');

  section.classList.remove('valid', 'invalid');
  section.classList.add(isValid ? 'valid' : 'invalid');
  feedback.textContent = message;
}

function clearSection(sectionId) {
  var section = getSection(sectionId);
  section.classList.remove('valid', 'invalid');
  section.querySelector('.feedback').textContent = '';
}

/* ----- Validaciones ----- */

function validateUsername() {
  var val = getEl('username').value.trim();
  if (val === '') {
    setFeedback('username', 'Username cannot be empty', false);
    return false;
  }
  if (val.length < 3) {
    setFeedback('username', 'Username must be at least 3 characters', false);
    return false
  }
  setFeedback('username', 'Cool username!', true);
  return true;
}

function validateEmail() {
  var val = getEl('email').value.trim();
  var emialRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (val === '') {
    setFeedback('email', 'Email cannot be empty', false);
    return false;
  }

  if (!emialRegex.test(val)) {
    setFeedback('email', 'Please enter a valid email address', false);
    return false;
  }

  setFeedback('email', 'Valid email!', true);
  return true;
}

// Signos permitidos: ` ~ ! @ # $ % ^ & * ( ) _ + - = { } | [ ] \ : " ; ' < > ? , . /
var ALLOWED_SYMBOLS = /[`~!@#$%^&*()_+\-={}\|[\]\\:";<>?,./\']/;
var RULES_IDS = ['length', 'upper', 'lower', 'number', 'symbol'];

/* Comprueba que la contraseña tenga mayúsculas, minúsculas, cifras, símbolos y >= 8 carácteres */
function checkPasswordRules(password) {
  return {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: ALLOWED_SYMBOLS.test(password)
  };
}

function updatePasswordRulesUI(rules) {
  for (var i = 0; i < RULES_IDS.length; i++) {
    var el = getRule(RULES_IDS[i]);
    var pass = rules[RULES_IDS[i]];
    el.classList.toggle('pass', pass);
    el.classList.toggle('fail', !pass);
    var texts = {
      length: (pass ? '✓' : '✗') + ' At least 8 characters',
      upper: (pass ? '✓' : '✗') + ' Contains uppercase letter',
      lower: (pass ? '✓' : '✗') + ' Contains lowercase letter',
      number: (pass ? '✓' : '✗') + ' Contains number',
      symbol: (pass ? '✓' : '✗') + ' Contains symbol'
    };
    el.textContent = texts[RULES_IDS[i]];
  } 
}

function getSecurity(rules) {
  var passed = 0;
  for (var i = 0; i < RULES_IDS.length; i++) {
    if (rules[RULES_IDS[i]]) passed++;
  }
  return passed;
}

function updateSecurityBar(score) {
  var fill = getEl('securityFill');
  var label = getEl('securityLabel');
  var data = [
    { color : '#ff3b3b', text : 'Very weak'},
    { color : '#ff7a00', text : 'Weak'},
    { color : '#f5c400', text : 'Medium'},
    { color : '#7ecf2b', text : 'Strong'},
    { color : '#c8f135', text : 'Very strong'}
  ]
  if (score === 0) {
    fill.style.width = '0%';
    label.textContent = '';
    return;
  }

  var index = score - 1;
  var percentage = (score / 5) * 100;
  fill.style.width = percentage + '%';
  fill.style.background = data[index].color;
  label.textContent = score === 0 ? '' : data[index].text;
  label.style.color = data[index].color;
}

function validatePassword() {
  var val = getEl('password').value;
  var rules = checkPasswordRules(val);

  updatePasswordRulesUI(rules);
  var score = getSecurity(rules);
  updateSecurityBar(score);

  if (val === '') {
    setFeedback('password', 'Password cannot be empty', false);
    return false;
  }

  var correctRules = rules.length && rules.upper && rules.lower && rules.number && rules.symbol;
  if (!correctRules) {
    setFeedback('password', 'Password must contain uppercase, lowercase, number and symbol', false);
    return false;
  }

  setFeedback('password', 'Strong password!', true);
  return true;
}

function validatePassword2() {
  var password2 = getEl('password2').value;

  if (password2 === '') {
    setFeedback('password2', 'Confirm password cannot be empty', false);
    return false;
  }
  
  var password = getEl('password').value;
  if (password !== password2) {
    setFeedback('password2', 'Passwords do not match', false);
    return false;
  }

  setFeedback('password2', 'Passwords match!', true);
  return true;
}

/* ----- Event listeners ----- */

getEl('username').addEventListener('blur', validateUsername);
getEl('username').addEventListener('input', validateUsername);

getEl('email').addEventListener('blur', validateEmail);
getEl('email').addEventListener('input', validateEmail);

getEl('password').addEventListener('blur', validatePassword);
getEl('password').addEventListener('input', validatePassword);

getEl('password2').addEventListener('blur', validatePassword2);
getEl('password2').addEventListener('input', validatePassword2);


getEl('form').addEventListener('submit', function (e) {
  e.preventDefault();

  var vu = validateUsername();
  var ve = validateEmail();
  var vp = validatePassword();
  var vc = validatePassword2();

  if (vu && ve && vp && vc) {
    console.log('Form submitted');

    var button = document.querySelector('button');

    /*button.classList.add('success');*/
    button.querySelector('span').textContent = 'Account created!';
    button.style.background = 'var(--succes-color)';
    button.style.transform = 'scale(1.05)';
    button.disabled = true;

    confetti({
      particleCount: 120,
      angle: 60,
      spread: 30,
      orgin: {x: 0, y: 1},
      colors: ['#c8f135', '#2ecc71', '#e6ac00', '#f0efe8']
    });
    
    confetti({
      particleCount: 120,
      angle: 120,
      spread: 30,
      orgin: {x: 1, y: 1},
      colors: ['#c8f135', '#2ecc71', '#e6ac00', '#f0efe8'] 
    });
  }
});