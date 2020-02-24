export const routes = {
  api: {
    domain: 'http://react-backend.test',
    prefix: 'api',
    paths: {
      authenticate: {
        login: 'auth/login',
        refresh: 'auth/refresh',
        me: 'auth/me'
      },
      dashboard: 'dashboard',
      category: {
        all: 'categories'
      }
    }
  }
}

