import '@babel/polyfill';

//*USERS
import { login, logout } from './users/authentication.js';
import { signup } from './users/registration.js';
import { deleteMe } from './users/deleting.js';
import { updateMe } from './users/updating.js';

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

//*CATEGORIES
import { categoryAdding } from './categories/adding.js';
import { categoryUpdating } from './categories/updating.js';
import { categoryDeleting } from './categories/deleting.js';

//?DOM ELEMENTS
const addCategory = document.querySelector('#add-category');
const editCategories = document.querySelectorAll('.edit-category');
const deleteCategories = document.querySelectorAll('.delete-category');
//?

if (addCategory)
  addCategory.addEventListener('submit', (e) => {
    e.preventDefault();
    categoryAdding(addCategory.name.value);
  });

if (editCategories)
  editCategories.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      categoryUpdating(form.id.value, form.name.value);
    });
  });

if (deleteCategories)
  deleteCategories.forEach((btn) => {
    btn.addEventListener('click', () => {
      categoryDeleting(btn.dataset.id);
    });
  });

//*TAGS
import { tagAdding } from './tags/adding.js';
import { tagUpdating } from './tags/updating.js';
import { tagDeleting } from './tags/deleting.js';

//?DOM ELEMENTS
const addTag = document.querySelector('#add-tag');
const editTags = document.querySelectorAll('.edit-tag');
const deleteTags = document.querySelectorAll('.delete-tag');
//?

if (addTag)
  addTag.addEventListener('submit', (e) => {
    e.preventDefault();
    tagAdding(addTag.name.value);
  });

if (editTags)
  editTags.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      tagUpdating(form.id.value, form.name.value);
    });
  });

if (deleteTags)
  deleteTags.forEach((btn) => {
    btn.addEventListener('click', () => {
      tagDeleting(btn.dataset.id);
    });
  });

//*PICTURES
import { pictureAdding } from './pictures/adding.js';
import { pictureUpdating } from './pictures/updating.js';
import { pictureUpdatingStatus } from './pictures/updating-status.js';
import { pictureDeleting } from './pictures/deleting.js';

//?DOM ELEMENTS
const addPicture = document.querySelector('#add-picture');
const updatePicture = document.querySelector('#update-picture');
const deletePictures = document.querySelectorAll('.delete-picture');
const confirmPictures = document.querySelectorAll('.confirm-picture');
const rejectPictures = document.querySelectorAll('.reject-picture');
//?

if (addPicture)
  addPicture.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    document.querySelectorAll('input[type=checkbox]:checked').forEach((e) => {
      form.append('tag_ids', e.value);
    });
    form.append('name', addPicture.name.value);
    form.append('category_id', addPicture.category_id.value);
    form.append('format', addPicture.format.value);
    form.append('price', addPicture.price.value);
    form.append('image', addPicture.image.files[0]);
    pictureAdding(form);
  });

if (updatePicture)
  updatePicture.addEventListener('submit', (e) => {
    e.preventDefault();
    let tags = [];
    document.querySelectorAll('input[type=checkbox]:checked').forEach((e) => {
      tags.push(e.value);
    });
    pictureUpdating(updatePicture.id.value, {
      name: updatePicture.name.value,
      tag_ids: tags,
      category_id: updatePicture.category_id.value,
      format: updatePicture.format.value,
      price: updatePicture.price.value,
      status: 'checking',
    });
  });

if (deletePictures)
  deletePictures.forEach((btn) => {
    btn.addEventListener('click', () => {
      pictureDeleting(btn.dataset.id);
    });
  });

if (confirmPictures)
  confirmPictures.forEach((btn) => {
    btn.addEventListener('click', () => {
      pictureUpdatingStatus(btn.dataset.id, 'active', null);
    });
  });

if (rejectPictures)
  rejectPictures.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      pictureUpdatingStatus(form.id.value, 'rejected', form.message.value);
    });
  });

//*BUYING
import { buyPicture } from './buying/stripe.js';

//?DOM ELEMENTS
const buyPictureBtns = document.querySelectorAll('.buy-picture');
//?

if (buyPictureBtns)
  buyPictureBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      btn.innerHTML = 'Обробка...';
      buyPicture(btn.dataset.id);
    });
  });
