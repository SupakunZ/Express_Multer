const multer = require('multer')

//** ต้องส่งมาเป็น multipart form-data  */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads') //** ที่อยู่ที่จะให้เก็บรูป */
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) // Genชื่อไฟล์ที่ตั้ง
    cb(null, 'GUNZ-' + uniqueSuffix + file.originalname) //ชื่อไฟล์
  }
})

exports.upload = multer({ storage: storage }).single('file') //.single ยอมรับ fieldname ที่ชื่อ file