/**
 * 1° step: receber os dados tipados da requisição pelo método execute;
 * 2º step: importar o model User como retorno do método;
 */
import { getRepository } from 'typeorm'
import User from '../models/User'

interface RequestData {
  name: string
  email: string
  password: string
}

export default class CreateUserService {
  public async execute({ name, email, password }: RequestData): Promise<User> {
    const userRepository = getRepository(User)

    const checkUserExists = await userRepository.findOne({
      where: { email }
    })

    if (checkUserExists) {
      throw new Error('Email address already used...')
    }

    const user = userRepository.create({ name, email, password })

    await userRepository.save(user)

    return user
  }
}
