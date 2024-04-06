import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, handleDelete } from '../redux/productData/action';

const MyStore = () => {
    const { isLoading, products } = useSelector((store) => store.productReducer)
    const dispatch = useDispatch();
    const [color, setColor] = useState(false);
    const [showPopup, setshowPopup] = useState(false)
    const [formData, setFormData] = useState({
        avatar: '',
        title: '',
        description: '',
        Price: 0
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://arba-backend-j9r7.onrender.com/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: formData.avatar,
                    title: formData.title,
                    description: formData.description,
                    Price: parseFloat(formData.Price)
                })
            });
            const data = await response.json();
            setshowPopup(false)
            alert('Product added successfully');

        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error in adding product');
            setshowPopup(false)
        }
    };


    console.log(products);


    useEffect(() => {
        dispatch(getProduct())
    }, [])

    function handleDeletee(id) {
        dispatch(handleDelete(id));
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }


    return (
        <>
            <div className='store-div'>
                <h2>Store</h2>
                <div>
                    <button style={{ backgroundColor: color ? "rgb(0, 171, 197)" : "grey", color: "white", fontWeight: "bold" }} onClick={() => setColor(!color)} className='btn'>Categories</button>
                    <button style={{ backgroundColor: color ? "grey" : "rgb(0, 171, 197)", color: "white", fontWeight: "bold" }} onClick={() => setColor(!color)} className='btn'>Products</button>
                </div>
                <div className='filter'>
                    <button onClick={() => window.location.reload()}>Refresh</button>
                    <button>Filter</button>
                    <button onClick={() => setshowPopup(true)}>Add</button>
                </div>
                <div>
                    <table>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Actions</th>
                        </tr>

                        {products?.map(function (ele) {
                            return (
                                <React.Fragment>
                                    <tr>
                                        <td><img style={{ width: 100 }} src={ele.avatar} alt="" /></td>
                                        <td>{ele.title}</td>
                                        <td>{ele.description}</td>
                                        <td>
                                            <button style={{ width: "50%", cursor: "pointer" }}>Edit</button>
                                            <button onClick={() => handleDeletee(ele._id)} style={{ width: "50%", cursor: "pointer" }}>Delete</button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </table>
                </div>
            </div>
            {showPopup && (
                <React.Fragment>
                    <div className='backdrop' ></div>
                    <div className='store-add-div'>
                        <form onSubmit={handleAddProduct}>
                            <h2>Add Product</h2>
                            <input type="text" name="avatar" placeholder='Avatar' value={formData.avatar} onChange={handleChange} />
                            <input type="text" name="title" placeholder='Enter name' value={formData.title} onChange={handleChange} />
                            <input type="text" name="description" placeholder='Enter slug' value={formData.description} onChange={handleChange} />
                            <input type="number" name="Price" placeholder='Enter price' value={formData.Price} onChange={handleChange} />
                            <button style={{backgroundColor:"rgb(0, 171, 197)",border:"none",color:"white",fontWeight:"bold",cursor:"pointer"}} type="submit">Add</button>
                        </form>
                        <div>
                            <button style={{ marginTop: "20px", cursor: "pointer",backgroundColor:"rgb(0, 171, 197)",border:"none",color:"white",fontWeight:"bold" }} onClick={() => setshowPopup(false)}>Cancel</button>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </>
    );
}

export default MyStore;
