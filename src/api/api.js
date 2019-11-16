export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "3329387323e65172635a4e47744866d7";

export const API_KEY_4 =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzI5Mzg3MzIzZTY1MTcyNjM1YTRlNDc3NDQ4NjZkNyIsInN1YiI6IjVkMTI4OGJiYzNhMzY4NzU2YTFlMjkyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5ekEC7o8PJQ3PmEvlf6rr2hg1cyXSKPVAkTq5LmfVRs";

export const fetchApi = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        if (response.status < 400) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch(response => response.json())
      .then(error => {
        reject(error);
      });
  });
};
