// import { Test, TestingModule } from "@nestjs/testing";
// import { UserController } from "./user.controller"
// import { UserService } from "./user.service";
// import { PrismaService } from "../prisma/prisma.service";
// import { UserRepository } from "./user.repository";
// import { CreateUserDto } from "./user.dto";
// import { HttpException, HttpStatus } from "@nestjs/common";

// describe("user unit tests", ()=>{
//   let userController: UserController;
//   let userService: UserService;
//   let userRepository: UserRepository;


//   beforeEach(async ()=>{
//     const user: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [UserService, PrismaService, UserRepository],
//     }).compile();

//     userController = user.get(UserController);  
//     userService = user.get(UserService);
//     userRepository = user.get(UserRepository);

//     describe("UserRepository Tests", ()=>{

//       it('Should return "bad request"', async()=>{
//         jest.spyOn(userRepository, "create").mockResolvedValue({email: "", password: "", id: -1})
//         const creationUser = await userController.create({} as CreateUserDto)
//         expect(creationUser).rejects.toThrow(new HttpException("Error", HttpStatus.BAD_REQUEST))
//       })
//     })
//   })
// })


import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { UserRepository } from "./user.repository";
import { faker } from "@faker-js/faker/.";

describe("UserRepository tests", () => {
  let userRepository: UserRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const userTest: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [UserRepository, PrismaService],
    }).compile()

    prisma = userTest.get(PrismaService);
    userRepository = userTest.get(UserRepository);
  });

  describe("Create user tests", () => {
    it("should create a new user at database", async () => {
      const userData = {
        email: faker.internet.email(),
        password: faker.internet.password()
      }
      await userRepository.create(userData.email, userData.password);
      const findUser = await userRepository.findByEmail(userData.email)

      expect(findUser).not.toBeNull()
      expect(findUser?.email).toBe(userData.email)
    })
  })

  it("Should return erro to create duplicate", async()=>{
    const userData = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
    await userRepository.create(userData.email, userData.password);
    expect(userRepository.create(userData.email, userData.password)).rejects.toMatchObject({code: "P2002"})
  })

  it("Should find a user by email", async ()=>{
    const userData = {
      email: faker.internet.email(),
      password: faker.internet.password()
    }

    await userRepository.create(userData.email, userData.password);
    expect(userRepository.findByEmail(userData.email)).resolves.toMatchObject(userData)
  })

})