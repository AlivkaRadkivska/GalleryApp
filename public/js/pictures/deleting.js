import axios from 'axios';

export const pictureDeleting = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://localhost:3000/api/pictures/${id}`,
    });

    window.setTimeout(() => {
      location.reload(true);
    }, 100);
  } catch (err) {
    console.log(err.response.data);
    document.getElementById('category-msg').innerHTML = err.response.data.message;
  }
};
