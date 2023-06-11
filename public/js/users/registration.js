import axios from 'axios';

export const signup = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/users/signup',
      data,
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign('/');
      }, 100);
    }
  } catch (err) {
    console.log(err.response.data);
    document.getElementById('msg').innerHTML = err.response.data.message;
  }
};
