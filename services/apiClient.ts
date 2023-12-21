import axios from 'axios'

let authToken: string | undefined
if (localStorage) {
  authToken = localStorage.getItem('auth-token') ?? undefined
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: !authToken ? undefined : {
    Authorization: authToken,
  },
})

export default axiosInstance
