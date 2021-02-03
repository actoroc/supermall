import axios from 'axios';
//封装的axios,方便维护
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 4000,
  });
  //Promise
  instance.interceptors.response.use(
    (res) => {
      return res.data;
    },
    (err) => {
      console.log(err);
    }
  );
  //instance 返回Promise
  return instance(config);
}
