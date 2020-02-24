import { routes } from "@/constants/routes"

const buildApiUrl = (path) => {
  const apiRoute = routes.api.domain + "/" + routes.api.prefix;
  if (path !== "undefined") {
    return apiRoute + "/" + path;
  }
  return apiRoute;
}

const buildRelativeUrl = (path) => {
  return "/"+path
}

export {buildApiUrl, buildRelativeUrl}
