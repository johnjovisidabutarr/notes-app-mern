import { useEffect } from 'react'
import { axiosJWT } from '../api/axios'
import useRefreshToken from './useRefreshToken'
import useAuth from './useAuth'

const useAxiosJWT = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  useEffect(() => {
    const requestIntercept = axiosJWT.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = 'Bearer' + ' ' + auth?.accessToken
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = axiosJWT.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response.status == 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          return axiosJWT(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosJWT.interceptors.request.eject(requestIntercept)
      axiosJWT.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return axiosJWT
}

export default useAxiosJWT
