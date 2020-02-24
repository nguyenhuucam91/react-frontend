import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import { routes } from '@/constants/routes'
import { router } from 'umi'
import UnauthenticatedException from '@/errors/UnauthenticatedException'
import { buildApiUrl, buildRelativeUrl } from './url'
import ApiCallException from '@/errors/ApiCallException'

export const LOCAL_STORAGE_AUTH_PREFIX = '__react-frontend__'
export const AUTH_TOKEN_KEY = 'auth-token'
const BACKEND_API_URL = "http://react-backend.test/api"

/**
 * Made for routes requires authentication
 * @param {*} url
 * @param {*} data
 * @param {*} additionalHeaders
 */
const makePrivateRequest = async (url, method, additionalOptions = {}) => {
  const { params, data, headers, ...rest } = additionalOptions

  try {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_AUTH_PREFIX + AUTH_TOKEN_KEY)
    if (!accessToken) {
      throw new UnauthenticatedException("Access token not found");
    }

    const refreshAuthLogic = async failedRequest => {
      const res = await axios.post('/', {}, {
        baseURL: buildApiUrl(),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      console.log(res);
      localStorage.setItem(LOCAL_STORAGE_AUTH_PREFIX + AUTH_TOKEN_KEY, res.data.access_token)
      failedRequest.response.config.headers['Authorization'] = 'Bearer ' + res.data.access_token
      return Promise.resolve()
    }

    createAuthRefreshInterceptor(axios, refreshAuthLogic)

    const axiosInstance = axios({
      url: buildApiUrl(url),
      params,
      method,
      data,
      baseURL: BACKEND_API_URL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        ...headers
      },
      ...rest
    }).catch(error => {
      throw new UnauthenticatedException(error)
    })

    return axiosInstance;

  } catch (e) {
    if (e.name === "UnauthenticatedException") {
      console.error(e);
      router.push(buildRelativeUrl(routes.api.paths.authenticate.login));
    }
  }
}

/**
 * Made for public routes, no need authentication
 * @param {*} url Url to parse
 * @param {*} data
 * @param {*} additionalHeaders
 */
const makePublicRequest = async (url, method, additionalOptions = {}) => {

  const { params, data, headers, ...rest } = additionalOptions
  try {
    const axiosInstance = await axios({
        url: buildApiUrl(url),
        method,
        data,
        params,
        baseURL: BACKEND_API_URL,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...headers
        },
        ...rest
      }).catch(error => {
        throw new ApiCallException(error)
      });
      return axiosInstance;
  } catch (e) {
    if (e.name === "ApiCallException") {
      console.error("Api call failed", e.message);
      return false;
    }
  }
}

export { makePrivateRequest, makePublicRequest }
