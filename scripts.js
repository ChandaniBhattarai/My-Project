const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (validateInputs()) {
    submitForm();
  }
});

function validateInputs() {
  let isValid = true;
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (nameValue === '') {
    setError(nameInput, 'Name is required');
    isValid = false;
  } else {
    setSuccess(nameInput);
  }

  if (emailValue === '') {
    setError(emailInput, 'Email is required');
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(emailInput, 'Email is not valid');
    isValid = false;
  } else {
    setSuccess(emailInput);
  }

  if (messageValue === '') {
    setError(messageInput, 'Message is required');
    isValid = false;
  } else {
    setSuccess(messageInput);
  }

  return isValid;
}

function setError(input, errorMessage) {
  const formControl = input.parentElement;
  const errorElement = formControl.querySelector('small');
  errorElement.innerText = errorMessage;
  formControl.classList.remove('success');
  formControl.classList.add('error');
}

function setSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('success');
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function submitForm() {
  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', form.action);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      alert('Thank you for contacting us!');
      form.reset();
      setSuccess(nameInput);
      setSuccess(emailInput);
      setSuccess(messageInput);
    }
  };
  xhr.send(new URLSearchParams(formData).toString());
}
