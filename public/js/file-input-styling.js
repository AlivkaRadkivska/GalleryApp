let inputs = document.querySelectorAll('.file-input-box .file-input');

for (const input of inputs) {
  input.onchange = function () {
    const name = this.files[0].name;
    let txt = '';
    if (name.length > 10)
      txt =
        '~ ' + name.slice(0, 5) + '...' + name.slice(-6, name.length) + ' ~';
    else txt = '~ ' + name + ' ~';
    this.parentElement.firstElementChild.innerHTML = txt;
  };
}
