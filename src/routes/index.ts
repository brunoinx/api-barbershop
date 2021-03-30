import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  return res.send({ message: 'Olá servidor wqwqwqw' })
})

export default routes
