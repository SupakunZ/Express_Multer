// rafce
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


import {
    remove,
    create,
    getdata

} from '../functions/product'



const FormProduct = () => {
    // javascript
    const [data, setData] = useState([])
    const [form, setForm] = useState({})

    useEffect(() => {
        // code
        loadData()
    }, [])
    console.log(process.env.REACT_APP_API)

    const loadData = async () => {
        getdata()
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))
    }
    
    const handleChange = (e) => {
        // console.log(e.target.files) //ค่าของไฟล์ที่อัพโหลด

        if (e.target.name === 'file') { //ถ้ามีการเพิ่มไฟล์ให้เพิ่มส่งไปใน form
            setForm({
                ...form,
                [e.target.name]: e.target.files[0]
            })
        } else{
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(form)
        //**ก่อนที่จะส่งต้องส่ง form เป็น multipart/form-data */
        const formWithImageData = new FormData()
        for (const key in form) { //ใช้ for in ในการ loop object ให้อยู่ในรูป  multipart/form-data
            formWithImageData.append(key,form[key]) //append { key:value } เพิ่ม key:value ลงใน object
            }
            console.log(formWithImageData) //ไม่แสดงเพราะเป็นแบบ multipart/form-data
            create(formWithImageData)
                .then(res => {
                    console.log(res.data)
                    loadData()
                })
                .catch((err) => console.log(err))
        }
        
        const handleRemove = async (id) => {
            remove(id)
                .then((res) => {
                    console.log(res)
                    loadData()
                })
                .catch((err) => console.log(err))
        }
    
        return (
        <div>
            {/* HTML */}
            FormProduct
            <form onSubmit={handleSubmit} encType="multipart/form-data"> {/*ต้องกำหนดให้ส่งเป็น multipart/form-data */}
                <input
                    type='text'
                    name='name'
                    onChange={e => handleChange(e)}
                    placeholder='name'
                /> <br />

                <input type='text'
                    name='detail'
                    placeholder='detail'
                    onChange={e => handleChange(e)}
                /><br />

                <input
                    type='text'
                    name='price'
                    placeholder='price'
                    onChange={e => handleChange(e)}
                 />
                <br />
                <input
                    type='file'
                    name='file'
                    onChange={e => handleChange(e)} />
                <br />
                <button>Submit</button>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Detail</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data ? data.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.detail}</td>
                                <td><img src={`${process.env.REACT_APP_API}uploads/${item.file}`} alt="test" width="60" height="60"/></td>
                                <td>{item.price}</td>
                                <td onClick={() => handleRemove(item._id)}>
                                    delete
                                </td>
                                <td>
                                    <Link to={'/edit/' + item._id}>
                                        edit
                                    </Link>
                                </td>
                            </tr>
                        )
                            : null
                    }
                </tbody>
            </table>
        </div>
    )
}

export default FormProduct