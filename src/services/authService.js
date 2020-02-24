import { routes } from '@/constants/routes.js'
import { makePublicRequest, makePrivateRequest } from '@/utils/request.js'

const authService = {
  login: async ({email, password}) => {
      const result = await makePublicRequest(routes.api.paths.authenticate.login, 'POST', {
        data: {email, password}
      })

      //if axios instance exist => API call success
      if (result) {
        return {
          success: true,
          data: result.data
        }
      }

      return {
        success: false,
      }
  },

  user: async () => {
    try {
      const result = await makePrivateRequest(routes.api.paths.authenticate.me, 'POST');
      if (result.status === 200) {
        return {
          success: true,
          data: result.data
        }
      }

    } catch (e) {

    }
  }
}

export default authService;
