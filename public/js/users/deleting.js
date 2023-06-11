import axios from 'axios';

export const deleteMe = async () => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: 'http://localhost:3000/api/users/me',
    });

    window.setTimeout(() => {
      location.assign('/');
    }, 100);
  } catch (err) {
    console.log(err.response.data);
  }
};
