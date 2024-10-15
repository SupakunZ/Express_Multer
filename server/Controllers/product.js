const Product = require('../Models/Product')
const fs = require('fs') //module ใช้จัดการไฟล์


exports.read = async (req, res) => {
    try {
        // code
        const id = req.params.id
        const producted = await Product.findOne({ _id: id }).exec();
        res.send(producted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.list = async (req, res) => {
    try {
        // code
        const producted = await Product.find({}).exec();
        res.send(producted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.create = async (req, res) => {
    try {
        // code
        // console.log(req.body)
        // console.log(req.file)
        //**file จะส่งแยกไม่ได้อยู่ใน body แต่อยู่ใน file **
        //**1.เพิ่มชื่อ filename ส่งใน form ที่ส่งมาเพื่อนำไปเก็บใน database **
        var data = req.body
        //**2.ตรวจสอบว่ามี file ส่งมาไหม */
        if (req.file) {
            data.file = req.file.filename    
        }
        //3.ส่งไปบันทึกลงใน database
        const producted = await Product(data).save()
        res.send(producted)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.update = async (req, res) => {
    try {
        // code
        const id = req.params.id
        var newData = req.body
        // console.log(req.body)
        // console.log(req.file)
        //ตรวจสอบว่ามีรูปส่งมาไหม
        if (typeof req.file != 'undefined') {
            //1.เพิ่ม ชื่อไฟล์ไหมลงใน form ที่ส่งมา
            newData.file = req.file.filename 
            //2.ลบรูปเดิมออก
            await fs.unlink('./uploads/'+newData.fileold,(err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Edit success')
                }
            })
        }
        const updated = await Product
            .findOneAndUpdate({ _id: id }, newData, { new: true })
            .exec()
        res.send(updated)

    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.remove = async (req, res) => {
    try {
        // code
        const id = req.params.id
        const removed = await Product.findOneAndDelete({_id:id}).exec()
        //ลบรูปที่อยูใน severs
        //ตรวจสอบว่า removed.file มีไหม
        if (removed?.file) {
            await fs.unlink('./uploads/'+removed.file,(err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Remove success')
                }
            })
        }
        res.send(removed)
    } catch (err) {
        // error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
