import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import Metadata from "../Metadata";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  // console.log('user' , user)
  const columns = [
    { field: "id", headersName: "Order ID", minWidth: 100, flex: 0.5 },
    {
      field: "status",
      headersName: "Status",
      minWidth: 100,
      flex: 0.3,
      cellClassNmae: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headersName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headersName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItem.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    let isMounted = true;

    const cleanUp = () => {
      isMounted = false;
      dispatch(clearErrors());
    };
    if (isMounted) {
      if (error) {
        alert.error(error);
      }
      dispatch(myOrders());
    }
    return cleanUp;
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      <Metadata title="My Orders" />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <Typography id="myOrdersHeading">My Orders</Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
