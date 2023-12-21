import axios from 'axios'

const authToken = localStorage.getItem('auth-token')

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: !authToken ? undefined : {
    Authorization: authToken,
  },
})

export default axiosInstance
