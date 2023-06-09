let imgs = document.querySelectorAll('.modal-img');

if (imgs)
  for (const img of imgs) {
    img.oncontextmenu = function () {
      return false;
    };
  }
