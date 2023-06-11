import axios from 'axios';

export const pictureUpdatingStatus = async (id, status, message) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/pictures/${id}/status`,
      data: {
        status,
        message,
      },
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.reload(true);
      }, 100);
    }
  } catch (err) {
    console.log(err.response.data);
    document.getElementById('msg').innerHTML = err.response.data.message;
  }
};
