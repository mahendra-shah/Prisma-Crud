const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


router.get('/', (req, res) => {
    res.send('hello')
})

// register
router.post('/create', async (req, res) => {
    const { name, email, mobile, password } = req.body
    try {
        const user = await prisma.customers.findUnique({
            where: { email }
        })
        if (user == null){
            const sent = await prisma.customers.create({
                data:{name, email, mobile, password}
            })
            return res.send(sent)
        }
        res.send('data already exists')
    } catch (error) {
        res.status({
            status:500, msg:error.message
        })
    }
})

// login
router.post('/login', async (req, res)=>{
    const {email, password} = req.body
    try {
        const user = await prisma.customers.findMany({
            where:{email, password}
        })
        if (user.length == 1){
            return res.send('logged in success')
        }
        res.send('register first')
    } catch (error) {
        res.status({
            status:500, msg:error.message
        })
    }
})

// update
router.patch('/update/:id', async (req, res)=>{
    const {name} = req.body
    try {
        const user =  await prisma.customers.update({
            where:{id:Number(req.params.id)},
            data:{name}
        })
        res.send(user)
    } catch (error) {
        res.send(error.message)
    }
})

// delete
router.delete('/delete', async(req, res)=>{
    const {email} = req.body
    try {
        await prisma.customers.delete({
            where:{email}
        })
        res.send('deleted')
    } catch (error) {
        res.send(error.message)
    }
})

// read
router.get('/read', async(req, res)=>{
    const data =  await prisma.customers.findMany()
    res.send(data)
})

module.exports = router