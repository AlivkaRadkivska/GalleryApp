import axios from 'axios';

export const categoryUpdating = async (id, name) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/categories/${id}`,
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
    document.getElementById('category-msg').innerHTML = err.response.data.message;
  }
};
