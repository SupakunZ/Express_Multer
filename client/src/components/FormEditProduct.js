import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { read, update } from '../functions/product'

const FormEditProduct = () => {
    const params = useParams()
    const navigate = useNavigate()


    const [data, setData] = useState({
        name: '',
        detail: '',
        price: ''
    })
    const [fileold,setFileold] = useState() //ใชเก็บค่า ชื่อรูปภาพที่มาจาก database

    useEffect(() => {
        loadData(params.id)
    }, [])

    const loadData = async (id) => {
        read(id)
            .then((res) => {
                setData(res.data)
                setFileold(res.data.file)
            })
    }
    const handleChange = (e) => {
        // console.log(e.target.files) //ค่าของไฟล์ที่อัพโหลด

        if (e.target.name === 'file') { //ถ้ามีการเพิ่มไฟล์ให้เพิ่มส่งไปใน form
            setData({
                ...data,
                [e.target.name]: e.target.files[0]
            })
        } else{
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)
        console.log(fileold)
        //**ก่อนที่จะส่งต้องส่ง form เป็น multipart/form-data */
        const formWithImageData = new FormData()
        for (const key in data) { //ใช้ for in ในการ loop object ให้อยู่ในรูป  multipart/form-data
            formWithImageData.append(key,data[key])
            }
        //เพิ่มชื่อของไฟล์รูปเดิมส่งไปด้วย    
        formWithImageData.append('fileold',fileold)
        update(params.id, formWithImageData)
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>FormEditProduct 555

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type='text'
                    name='name'
                    onChange={e => handleChange(e)}
                    placeholder='name'
                    value={data.name}
                /> <br />

                <input type='text'
                    name='detail'
                    placeholder='detail'
                    value={data.detail}
                    onChange={e => handleChange(e)}
                /><br />

                <input
                    type='text'
                    name='price'
                    placeholder='price'
                    value={data.price}
                    onChange={e => handleChange(e)} />
                <br />
                <input
                    type='file'
                    name='file'
                    onChange={e => handleChange(e)} />
                <br />
                <button>Submit</button>
            </form>

        </div>
    )
}

export default FormEditProduct