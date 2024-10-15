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
        console.log(form)
        // create(form)
        //     .then(res => {
        //         console.log(res.data)
        //         loadData()
        //     })
        //     .catch((err) => console.log(err))
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
            <form onSubmit={handleSubmit}>
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
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">detail</th>
                        <th scope="col">price</th>
                        <th scope="col">action</th>
                        <th scope="col">edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data ? data.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.detail}</td>
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