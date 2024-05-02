import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    await prisma.user.upsert({
        where: {
            email:'felipe.kespers@alpar.com.br'
        },
        create: {
            name: 'Felipe Kespers',
            email: 'felipe.kespers@alpar.com.br',
            password: '123123123',
            admin: true
        },
        update: {}
    })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit()
})