import { makePrivateRequest } from "@/utils/request"
import { CATEGORY, routes } from "@/constants/routes"

const categoryService = {
  all: async ({page, perpage}) => {
    const result = await makePrivateRequest(routes.api.paths.category.all, 'GET', {
      params: {page, perpage}
    })
    if (result.status === 200) {
      return {
        success: true,
        data: result.data
      }
    }

    return {
      success: false,
      message: 'Cannot get categories'
    }
  }
}


export default categoryService
