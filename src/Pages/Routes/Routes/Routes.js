import { createBrowserRouter } from "react-router-dom";
import Main from "../../../Layout/Main";
import Blog from "../../Blog/Blog";
import ErrorPage from "../../ErrorPage/ErrorPage";
import Login from "../../Form/Login/Login";
import Register from "../../Form/Register/Register";
import Home from "../../Home/Home/Home";
import DashBoard from "../../DashBoard/DashBoard/DashBoard"
import MyOrders from "../../DashBoard/MyOrders/MyOrders";
import DashBoardLayout from "../../../Layout/DashBoardLayout";
import MyProducts from "../../DashBoard/MyProducts/MyProducts";
import AllSellers from "../../DashBoard/AllSellers/AllSellers";
import AllBuyers from "../../DashBoard/AllBuyers/AllBuyers";
import ReportedItems from "../../DashBoard/ReportedItems/ReportedItems";
import AddAProduct from "../../DashBoard/AddAProduct/AddAProduct";
import AddCategory from "../../DashBoard/AddCategory/AddCategory";
import Products from "../../Home/Categories/Category/Products/Products";
export const routes = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/home',
                element:<Home></Home>
            },
            {
                path:'/blog',
                element:<Blog></Blog>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/category/:id',
                element:<Products></Products>,
            },
           
        ]
    },
    {
        path:'/dashboard',
        element:<DashBoardLayout></DashBoardLayout>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/dashboard',
                element:<MyOrders></MyOrders>
            },
            {
                path:'/dashboard/myproducts',
                element:<MyProducts></MyProducts>
            },
            {
                path:'/dashboard/allsellers',
                element:<AllSellers></AllSellers>
            },
            {
                path:'/dashboard/allbuyers',
                element:<AllBuyers></AllBuyers>
            },
            {
                path:'/dashboard/addproduct',
                element:<AddAProduct></AddAProduct>
            },
            {
                path:'/dashboard/addcategory',
                element:<AddCategory></AddCategory>
            },
            {
                path:'/dashboard/reporteditem',
                element:<ReportedItems></ReportedItems>
            },
            
         
        ]
    }
])