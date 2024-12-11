import axios from "axios";
import qs from "qs";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  paramsSerializer: {
    serialize: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = cookies.get("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.error("request error : " + error);
    return Promise.reject(error);
  }
);

// TODO: interceptor response 처리
// instance.interceptors.response.use(
//     (res) => {
//       // console.log('axios.js response : ' , res);
//       return res
//     },
//     async (error) => {
//       console.error('axios.js reqponse error : ', error);
//       if(import.meta.env.VITE_IS_LOGIN === 'Y') {
//         const errorRes = error.response;
//         const errorAPI = error.response.config;
//         if (cookies.get('refreshToken') === null) {
//           store.commit('auth/needLogin', true);
//           return Promise.reject(error);
//         } else {
//           if (errorRes.status === 419) { // accessToken이 null일 경우 419코드를 받고 토큰 재생성 요청
//             try {
//               await store.dispatch('auth/refreshToken');
//               return instance(errorAPI);
//             } catch (err) {
//               // console.error('err);
//               return Promise.reject(err);
//             }
//           }
//           if (errorRes.status === 401) { //accessToken이 변조 등 유효하지 않은 토큰일 경우
//             console.warn('유효하지   않은 토큰', error);
//             store.commit('auth/needLogin', true);
//             alert('다시 로그인해주시기 바랍니다.');
//             return Promise.reject(error);
//           }
//         }
//       }
//       return Promise.reject(error);
//     }
//   )

export default axiosInstance;
