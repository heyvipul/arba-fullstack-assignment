import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, handleDelete } from '../redux/productData/action';

const MyStore = () => {
    const { isLoading, products } = useSelector((store) => store.productReducer)
    const dispatch = useDispatch();
    const [color, setColor] = useState(false);

    console.log(products);


    useEffect(() => {
        dispatch(getProduct())
    }, [])


    return (
        <>
            <div className='store-div'>
                <h2>Store</h2>
                <div>
                    <button style={{ backgroundColor: color ? "rgb(0, 171, 197)" : "grey", color: "white", fontWeight: "bold" }} onClick={() => setColor(!color)} className='btn'>Categories</button>
                    <button style={{ backgroundColor: color ? "grey" : "rgb(0, 171, 197)", color: "white", fontWeight: "bold" }} onClick={() => setColor(!color)} className='btn'>Products</button>
                </div>
                <div className='filter'>
                    <button>Refresh</button>
                    <button>Filter</button>
                    <button>Add</button>
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
                                            <button onClick={() => {
                                                dispatch(handleDelete(ele._id));
                                                window.location.reload();
                                            }} style={{ width: "50%", cursor: "pointer" }}>Delete</button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}


                    </table>
                </div>
            </div>
        </>
    );
}

export default MyStore;
