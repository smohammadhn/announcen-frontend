import axios from 'axios'

interface IOptions {
  baseURL: string
  withCredentials: boolean
  headers?: { Authorization: string }
}

const axiosDefaultOptions: IOptions = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'localhost:8000/api',
  withCredentials: true,
}

if (typeof window !== 'undefined') {
  const authToken = localStorage.getItem('auth-token')
  if (authToken) axiosDefaultOptions.headers = { Authorization: authToken }
}

const axiosInstance = axios.create(axiosDefaultOptions)
export default axiosInstance
