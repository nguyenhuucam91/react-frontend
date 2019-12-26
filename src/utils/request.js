import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { REFRESH_ROUTE } from '@/constants/routes'

export const LOCAL_STORAGE_AUTH_PREFIX = '__react-frontend__'
export const AUTH_TOKEN_KEY = 'auth-token'
const BACKEND_API_URL = "http://react-backend.test/api"

/**
 * Made for routes requires authentication
 * @param {*} url
 * @param {*} data
 * @param {*} additionalHeaders
 */
const makePrivateRequest = async (url, data = {}, method, options) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_AUTH_PREFIX + AUTH_TOKEN_KEY);

  const refreshAuthLogic = async failedRequest => {
    const res = await axios.post(BACKEND_API_URL + REFRESH_ROUTE, {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    localStorage.setItem(LOCAL_STORAGE_AUTH_PREFIX + AUTH_TOKEN_KEY, res.data.access_token)
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + res.data.access_token
    return Promise.resolve()
  }

  createAuthRefreshInterceptor(axios, refreshAuthLogic)

  return axios({
    url: BACKEND_API_URL + url,
    method,
    data,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      ...options
    },
  })
}

/**
 * Made for public routes, no need authentication
 * @param {*} url Url to parse
 * @param {*} data
 * @param {*} additionalHeaders
 */
const makePublicRequest = async (url, data = {}, method, options) => {

  const publicUrl = BACKEND_API_URL + url

  const axiosRequest = axios({
    url: publicUrl,
    method,
    data,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options
    },
  })
  return axiosRequest
}

export {makePrivateRequest, makePublicRequest}
