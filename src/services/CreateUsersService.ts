import User from "../models/User";
import { getRepository } from "typeorm";
import usersRouter from "../routes/users.routes";

import {hash } from 'bcryptjs';


interface Request{
    name: string;
    email: string;
    password: string;
}

class CreateUsersService {
   public async execute({name, email, password}: Request) : Promise<User>{
        const userRepository = getRepository(User);

      const checkUsersExist = await userRepository.findOne({
        where:{ email},

        
      });

      if(checkUsersExist){
        throw new Error('Email addres already used.');
      }

      const hashPassword = await hash(password, 8);

      const user = userRepository.create({
        name,
        email,
        password: hashPassword,
      });

      await userRepository.save(user);

      return user;
    }
    
}

export default CreateUsersService;