
import axios from 'axios'
import { store } from '../store'
import { refreshToken } from '../store/authSlice'

const baseURL = import.meta.env.VITE_BACKEND_URI

const axiosInstance = axios.create({
    baseURL,
    timeout: 30000,
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState()
        const token = state.auth.accessToken

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    }
)

axiosInstance.interceptors.response.use(
    (respone) => respone,
    async (error) => {
        console.error('error response ', error)
        const originalRequest = error.config

        if(error.response.status === '401' && error.response.data.message === "Unauthorized" && !originalRequest._retry){
            originalRequest._retry = true

            try {
                const response = await store.dispatch(refreshToken()).unwrap()
                const newtoken = response.accessToken
                originalRequest.headers.Authorization = `Bearer ${newtoken}`
                return axiosInstance(originalRequest)
            } catch (error) {
                
            }
        }

        return Promise.reject(error);
    }
)
export default axiosInstance