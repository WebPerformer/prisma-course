import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    await prisma.user.deleteMany()
    
    const user = await prisma.user.create({
        data: {
            name: "Kyle",
            email: "kyle@test.com",
            age: 27,
            userPreference: {
                create: {
                    emailUpdates: true
                }
            }
        },
        select: {
            name: true,
            userPreference: { select: { id: true } }
        }
    })

    const filter = await prisma.user.findFirst({
        where: {
            email: "webperformer@gmail.com"
        }
    })
}

main()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })