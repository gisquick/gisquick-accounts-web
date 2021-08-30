const pathname = location.pathname.replace(/\/+$/, '')
switch (pathname) {
  case '/signup':
    require('./signup/main.js')
    break
  case '/activate':
    require('./activate/main.js')
    break
   case '/new-password':
   require('./new-password/main.js')
   break
}
