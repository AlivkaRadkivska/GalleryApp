import axios from 'axios';

export const pictureUpdating = async (id, data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/pictures/${id}`,
      data,
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/artist/pictures');
      }, 100);
    }
  } catch (err) {
    console.log(err.response.data);
    document.getElementById('msg').innerHTML = err.response.data.message;
  }
};
