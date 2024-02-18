import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProducts, clearErrors, deleteProduct } from "../../actions/productAction";
import './productList.css'
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import Metadata from "../Metadata";
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { DELETE_PRODUCT_RESET } from "../../constaints/productConstant";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";


const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, products } = useSelector((state) => state.products);

    const { error: deleteError, isDeleted } = useSelector((state) => state.product)

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    const columns = [
        { field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5 },
        {
            field: 'name', headerName: "Name", minWidth: 200, flex: 0.5 
        },
        {
            field: 'stock', headerName: "Stock", minWidth: 150, flex: 0.1, type: 'number'
        },
        {
            field: 'price', headerName: "Price", minWidth: 270, flex: 0.3, type: 'number'
        },
        {
            field: 'actions', flex: 0.3, headerName: "Actions", minWidth: 150, type: 'number', sortable: false, renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}><EditIcon /> </Link>
                        <Button onClick={() => { deleteProductHandler(params.getValue(params.id, 'id')) }}><DeleteIcon /> </Button>
                    </Fragment>
                )
            }
        }
    ]

    const rows = [];

    products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name
        })
    });



    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success('Products Delete Successfully');
            navigate('/admin/dashboard');
            dispatch({ type: DELETE_PRODUCT_RESET })
            
        }
        dispatch(getAdminProducts())
    }, [dispatch, alert, error, isDeleted, deleteError, navigate])
    return (
        <Fragment>
            <Metadata title='All Products - Admin' />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id='productListHeading' >All Products</h1>

                    <DataGrid rows={rows} columns={columns} pageSize={6} disableSelectionOnClick className="productListTable" autoHeight />
                </div>
            </div>
        </Fragment>
    )
};


export default ProductList;