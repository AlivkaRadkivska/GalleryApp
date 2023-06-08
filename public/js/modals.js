let cards = document.querySelectorAll('.picture-mini-card .img');
let deleteBtn = document.querySelector('#delete-me-btn');
let closes = document.getElementsByClassName('close');

if (cards)
  for (const card of cards) {
    card.onclick = function () {
      this.parentElement.lastChild.classList = 'modal active';
    };
  }

if (closes)
  for (const close of closes) {
    close.onclick = function () {
      this.parentElement.parentElement.classList = 'modal';
    };
  }

if (deleteBtn)
  deleteBtn.onclick = function () {
    this.parentElement.lastChild.classList = 'modal active';
  };
