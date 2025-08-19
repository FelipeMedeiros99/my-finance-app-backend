import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { UserRepository } from "./user.repository";
import { faker } from "@faker-js/faker/.";
import { UserService } from "./user.service";

describe("User tests", () => {
  let userRepository: UserRepository;
  let userService: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const userTest: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [UserRepository, UserService, PrismaService],
    }).compile()

    prisma = userTest.get<PrismaService>(PrismaService);
    userRepository = userTest.get<UserRepository>(UserRepository);
    userService = userTest.get<UserService>(UserService)
  });

  describe("Create user tests", () => {
    it("should create a new user at database", async () => {
      let password = faker.internet.password();

      const userData = {
        email: faker.internet.email(),
        password: password,
        confirmPassword: password
      }
      await userService.createUser(userData);
      
      // await userRepository.create(userData.email, userData.password);
      const findUser = await userRepository.findByEmail(userData.email)

      expect(findUser).not.toBeNull()
      expect(findUser?.email).toBe(userData.email)
    })
  })

  it("Should return erro to create duplicate", async()=>{
    let password = faker.internet.password();
    const userData = {
      email: faker.internet.email(),
      password: password,
      confirmPassword: password
    }
    await userService.createUser(userData);
    expect(userService.createUser(userData)).rejects.toThrow("This email is already registered.")
  })

  it("Should find a user by email", async ()=>{
    let password = faker.internet.password();
    const userData = {
      email: faker.internet.email(),
      password: password,
      confirmPassword: password
    }

    await userService.createUser(userData);
    expect(userService.findUserByEmail(userData.email)).resolves.toMatchObject({email: userData.email})
  })

})