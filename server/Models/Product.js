const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    detail: {
        type: String
    },
    price: {
        type: Number
    },
    file:{ // Model ที่เพิ่มไฟล์รูป
        type:String,
        default:'noimage.jpg' //ถ้าไม่มีรูปภาพส่งมาจะเป็นรูปนี้
    }  
}, { timestamps: true })

module.exports = mongoose.model('products', productSchema)