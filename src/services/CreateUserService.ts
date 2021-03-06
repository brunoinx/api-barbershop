import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

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

    const hashedPassword = await hash(password, 8)

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await userRepository.save(user)

    return user
  }
}
