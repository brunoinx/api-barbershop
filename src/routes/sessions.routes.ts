import { Router } from 'express'
import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body

    const authenticateUser = new AuthenticateUserService()

    const { user, token } = await authenticateUser.execute({
      email,
      password
    })

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    }

    return res.json({ user: userWithoutPassword, token })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
})

export default sessionsRouter

/**
 * Regras de negócio para autenticação:
 * - verificar se o email é válido e/ou existe;
 * - verificar se a senha confere com a cadastrada no banco;
 * - Gerar o token jwt para manter o user autenticado;
 */
