import axios from 'axios';

export const tagAdding = async (name) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/tags',
      data: {
        name,
      },
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.reload(true);
      }, 100);
    }
  } catch (err) {
    console.log(err.response.data);
    document.getElementById('tag-msg').innerHTML = err.response.data.message;
  }
};
