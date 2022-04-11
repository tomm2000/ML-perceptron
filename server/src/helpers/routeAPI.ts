type file = {
  path: string,
  name: string,
  extension: string,
  complete: string,
}

/**
 * 
 * @param app The express application
 * @param files A list of the route files
 * @param routes_base The base path for http requests
 */
export function openRoutes(app: Express.Application, files: file[], routes_base: string | undefined = undefined) {
  files.forEach((route) => {
    let path = route.complete

    path = path.replace((global as any).home_dir, '..')

    import(path).then(r => {
      let base = routes_base ? `${routes_base}/` : ''
      
      if(r.get)
        r.get(app,  `${base}${route.path}/${route.name}`)
      if(r.post)
        r.post(app, `${base}${route.path}/${route.name}`)
    })
  })
}