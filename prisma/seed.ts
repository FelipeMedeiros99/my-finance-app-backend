import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const randomChoiche = (options: any[])=>{
  const randomNumber = Math.ceil(Math.random() * options.length) - 1
  return options[randomNumber];
}

const fakeUsers = async () =>{
  for (let i = 0; i < 5; i++) {
    const password = faker.internet.password();
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: password,
        confirmPassword: password
      },
    });
  }
}


async function main() {
  console.log('Starting seed...');

  console.log("Creating fake users...")
  await fakeUsers();

  
  console.log('Seed concluído!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


