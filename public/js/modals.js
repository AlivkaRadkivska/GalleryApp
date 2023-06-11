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

const pictures = document.querySelectorAll('.table-picture-img');

if (pictures) {
  const clearActive = () => {
    for (const picture of pictures) {
      picture.classList = 'table-picture-img';
    }
  };

  for (const picture of pictures) {
    picture.onclick = function () {
      if (this.classList.contains('active')) this.classList = 'table-picture-img';
      else {
        clearActive();
        this.classList = 'table-picture-img active';
      }
    };
  }
}
