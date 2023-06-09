import '@babel/polyfill';
import { login, logout } from './authentication.js';
import { signup } from './registration.js';
import { deleteMe } from './deleting-user.js';
import { updateMe } from './updating-user.js';

//?DOM ELEMENTS
const loginForm = document.querySelector('#login-form');
const logoutBtn = document.querySelector('#logout-btn');
const updateInfoForm = document.querySelector('#update-user-form');
const updatePassForm = document.querySelector('#update-pass-form');
const signupForm = document.querySelector('#signup-form');
const deleteBtn = document.querySelector('#delete-me-confirm');
//?

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    login(document.getElementById('email').value, document.getElementById('password').value);
  });

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (deleteBtn) deleteBtn.addEventListener('click', deleteMe);

if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('password', document.getElementById('password').value);
    form.append('password_confirm', document.getElementById('password_confirm').value);
    form.append('role', document.querySelector('input[name="role"]:checked').value);
    if (document.getElementById('avatar').files[0])
      form.append('avatar', document.getElementById('avatar').files[0]);
    signup(form);
  });

if (updateInfoForm)
  updateInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    if (document.getElementById('avatar').files[0])
      form.append('avatar', document.getElementById('avatar').files[0]);
    updateMe(form, 'info');
  });

if (updatePassForm)
  updatePassForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const curr_password = document.getElementById('curr_password').value;
    const password = document.getElementById('password').value;
    const password_confirm = document.getElementById('password_confirm').value;
    updateMe({ curr_password, password, password_confirm }, 'password');
  });
