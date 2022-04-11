import express from 'express'
import chalk from 'chalk'

export function get(app: express.Application, route: string) {
  console.log(chalk.blue('[INFO]'), `laoded route: ${route} : post`)

  app.get(`${route}`, (req: express.Request, res) => {

    res.send()
  })
}
