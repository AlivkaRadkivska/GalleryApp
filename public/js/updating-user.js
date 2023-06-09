import axios from 'axios';

export const updateMe = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://localhost:3000/api/users/update-password'
        : 'http://localhost:3000/api/users/update-info';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    console.log(res.data);

    if (res.data.status === 'success') location.assign('/');
  } catch (err) {
    console.log(err.response.data);
    document.getElementById('msg').innerHTML = err.response.data.message;
  }
};
