import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'
import authConfig from '../config/auth'

interface RequestData {
  email: string
  password: string
}

interface ResponseData {
  user: User
  token: string
}

export default class AuthenticateUserService {
  public async execute({
    email,
    password
  }: RequestData): Promise<ResponseData> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('Incorrect email/password combination')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination')
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return {
      user,
      token
    }
  }
}
