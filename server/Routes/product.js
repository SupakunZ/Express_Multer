const express = require('express')
const router = express.Router()

const {
    read,
    list,
    create,
    update,
    remove
} = require('../Controllers/product')

//**MiddleWare**
const { upload } = require('../Middleware/upload')


//http://localhost:5000/api/product
router.get('/product', list) //**สามารถใส่ middleware ('/endpoint',middleware,list) เพื่อใช้ในการตรวจสอบ token ก่อนได้**
router.get('/product/:id', read)
router.post('/product',upload, create) //middlewware
router.put('/product/:id', update)
router.delete('/product/:id', remove)




module.exports = router