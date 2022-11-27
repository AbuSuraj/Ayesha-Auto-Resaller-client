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
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import AdminRoutes from "../AdminRoutes/AdminRoutes";
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
        element:<PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
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
                element:<AdminRoutes><AllSellers></AllSellers></AdminRoutes>
            },
            {
                path:'/dashboard/allbuyers',
                element:<AdminRoutes><AllBuyers></AllBuyers></AdminRoutes>
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
                element:<AdminRoutes><ReportedItems></ReportedItems></AdminRoutes>
            },
            
         
        ]
    }
])