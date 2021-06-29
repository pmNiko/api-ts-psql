import express, { Application, json, urlencoded } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import IndexRoutes from './routes/index.routes'
import PostRoutes from './routes/post.routes'

type Port = string | number

export class App {
  /**
   * props to class
   */
  private app: Application
  private port?: Port

  constructor(aPort?: Port) {
    this.app = express()
    this.port = aPort
    this.setting()
    this.middlewares()
    this.routes()
  }

  /**
   * middlewares
   */
  middlewares() {
    // Show request to terminal
    this.app.use(morgan('dev'))

    // Request cross dommain
    this.app.use(cors())

    // Read from body
    this.app.use(json())

    // Enable send data from from
    this.app.use(urlencoded({ extended: false }))
  }


  /**
   * Routes 
   */
  routes() {
    this.app.use(IndexRoutes)
    this.app.use('/posts', PostRoutes)
  }


  /**
   * asignation of port
   */
  setting() {
    this.app.set('port', this.port || process.env.PORT || 4000)
  }

  /**
   * server listen
   */
  async listen() {
    await this.app.listen(this.app.get('port'))
    console.log("Server on port: ", this.app.get('port'));
  }
}