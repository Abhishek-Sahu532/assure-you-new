import React, { useEffect, useState } from "react";
import "./App.css";
import WebFont from "webfontloader";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import { Route, Routes } from "react-router-dom";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSingup from "./components/User/LoginSignup.js";
import store from "./Store.js";
import { loadUser } from "./actions/userAction.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgetPassword from "./components/User/ForgetPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./components/Cart/Success";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProducts.js";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import OrderList from "./components/Admin/OrderList.js";
import ProcessOrder from "./components/Admin/ProcessOrder.js";
import UsersList from "./components/Admin/UsersList.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import ProductReview from "./components/Admin/ProductReview.js";
import NotFound from "./components/NotFound/NotFound.js";
import Navbar from "./components/Navbar/Navbar.js";



function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);


  const [stripeKey, setStripeKey] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    // CHECKING THE USER ROLES
    if (user && user.role === 'admin') {
      setIsAdmin(true)
    }

    // RECEIVING THE STRIPE KEYS 
    async function getStripeApiKey() {
      try{
        const { data } = await axios.get("/api/v1/stripeapikey");
        setStripeKey(data.stripeApiKey);
      }catch(e){
        console.log('Error fetching in stripe key', e)
      }
    }
    getStripeApiKey();
    store.dispatch(loadUser()); //when user logged in, In the homepage the details of user will load
  }, [ user]);
  return (
    <div className="App">
      {stripeKey && (
        <Elements stripe={loadStripe(stripeKey)}>
          <Routes>
            <Route
              exact
              path="/process/payment"
              element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
              Component={Payment}
            />
          </Routes>
        </Elements>
      )}

      <Navbar user={user} />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Products} />
        <Route path="/products/:keyword" Component={Products} />
        <Route exact path="/search" Component={Search} />
        <Route exact path="/login" Component={LoginSingup} />
        <Route path="/password/forget" Component={ForgetPassword} />
        <Route path="/password/reset/:token" Component={ResetPassword} />


        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/shipping" element={<Shipping />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/order/:id" element={<OrderDetails />} />

        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/user/:id" element={<UpdateUser />} />
          <Route path="/admin/reviews" element={<ProductReview />} />
  

        </Route>

        {/* <Route
          path="/account/"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          Component={Profile}
        /> */}

        {/* <Route
          element={
            <ProtectedRoute
              exact
              path="/me/update/*"
              component={UpdateProfile}
            />
          }
        /> */}

        {/* <Route
          exact
          path="/password/update"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          Component={UpdatePassword}
        /> */}

        {/* <Route exact path="/cart" Component={Cart} /> */}

        {/* <Route
          exact
          path="/cart/shipping"
          isAuthenticated={isAuthenticated}
          element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          Component={Shipping}
        /> */}

        {/* <Route
          exact
          path="/success"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          Component={Success}
        /> */}
        {/* <Route
          exact
          path="/orders"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          Component={MyOrders}
        /> */}

        {/* <Route
          exact
          path="/order/confirm"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          Component={ConfirmOrder}
        /> */}
        {/* <Route
          path="/order/:id"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
          Component={OrderDetails}
        /> */}

        {/* <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} />
          }
          Component={Dashboard}
        /> */}
        {/* <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} />
          }
          Component={ProductList}
        /> */}
        {/* <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} />
          }
          Component={NewProduct}
        /> */}

        {/* <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} />
          }
          Component={UpdateProduct}
        /> */}
        {/* <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} />
          }
          Component={OrderList}
        /> */}
        {/* <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} />
          }
          Component={ProcessOrder}
        /> */}

        {/* <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} />
          }
          Component={UsersList}
        /> */}

        {/* <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} />
          }
          Component={UpdateUser}
        /> */}

        {/* <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} />
          }
          Component={ProductReview}
        /> */}

         <Route
          Component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        /> 
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
