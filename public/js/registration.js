import axios from 'axios';

export const signup = async (
  name,
  email,
  password,
  password_confirm,
  role,
  avatar
) => {
  try {
    if (avatar.length < 1) avatar = undefined;

    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/users/signup',
      data: {
        name,
        email,
        password,
        password_confirm,
        role,
        avatar,
      },
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
