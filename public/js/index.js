import '@babel/polyfill';
import { login, logout } from './authentication.js';
import { signup } from './registration.js';
import { deleteMe } from './deletingUser.js';

//?DOM ELEMENTS
const loginForm = document.querySelector('#login-form');
const logoutBtn = document.querySelector('#logout-btn');
const signupForm = document.querySelector('#signup-form');
const deleteBtn = document.querySelector('#delete-me-confirm');
//?

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    login(
      document.getElementById('email').value,
      document.getElementById('password').value
    );
  });

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (deleteBtn) deleteBtn.addEventListener('click', deleteMe);

if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    signup(
      document.getElementById('name').value,
      document.getElementById('email').value,
      document.getElementById('password').value,
      document.getElementById('password_confirm').value,
      document.querySelector('input[name="role"]:checked').value,
      document.getElementById('avatar').value
    );
  });
