import { LOGIN_ROUTE, ME } from '@/constants/routes.js'
import { makePublicRequest, makePrivateRequest } from '@/utils/request.js'

const authService = {
  login: async ({email, password}) => {
    const result = await makePublicRequest(LOGIN_ROUTE, {email, password}, 'POST')
    if (result.error) {
      return {
        success: false,
        message: "Incorrect email or password",
      }
    }
    return {
      success: true,
      data:result.data
    }
  },

  user: async () => {
    const result = await makePrivateRequest(ME, {}, 'POST');
    if (result.status === 200) {
      return {
        success: true,
        data: result.data
      }
    }
    else {
      return {
        success: false,
        message: 'Cannot get user'
      }
    }
  }
}

export default authService;
