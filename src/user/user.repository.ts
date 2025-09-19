import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"
// "src/prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(username: string, password: string) {
    ;

    const newUser = await this.prisma.user.create({
      data: {
        username: username,
        password: password
      }
    })

    await this.prisma.account.createMany({
      data: [
        {
          name: "Poupança",
          userId: newUser.id
        },
        {
          name: "Carteira",
          userId: newUser.id
        }
      ]
    })
    
    await this.prisma.category.createMany({
      data: [
        {
          name: "Gastos Essenciais",
          userId: newUser.id,
          type: 'EXPENSE'
        },{
          name: "Gastos Supérfulos",
          userId: newUser.id,
          type: 'EXPENSE'
        },{
          name: "Investimentos",
          userId: newUser.id,
          type: 'EXPENSE'
        },
        {
          name: "Salário",
          userId: newUser.id,
          type: 'INCOME'
        },{
          name: "Renda extra",
          userId: newUser.id,
          type: 'INCOME'
        },{
          name: "Benefícios",
          userId: newUser.id,
          type: 'INCOME'
        }
      ]
    })

  }


  async findUserByUsername(username: string) {
    return await this.prisma.user.findFirst({
      where: { username }
    })
  }
}