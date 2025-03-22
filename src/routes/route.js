import { Route, Routes } from "react-router-dom";
import Test from "../pages/test";
import LoginPage from "../pages/auth/login";
import Brands from "../pages/brands";
import AddBrands from "../pages/brands/addBrands.jsx";
import EditBrands from "../pages/brands/editBrands.jsx/index.jsx";
import Models from "../pages/models/index.jsx";
import AddModels from "../pages/models/addModels.jsx"
import EditModels from "../pages/models/editModels.jsx/index.jsx";
import Offers from "../pages/offers/index.jsx";
import AddOffers from "../pages/offers/addOffers/index.jsx";
import Stores from "../pages/stores/index.jsx"
import AddStores from "../pages/stores/addStores/index.jsx";
import EditStores from "../pages/stores/editStores/index.jsx"
import Products from "../pages/products/index.jsx";
import EditOffers from "../pages/offers/editOffers/index.jsx";
import Roles from "../pages/roles/index.jsx"
import AddRoles from "../pages/roles/addRoles/index.jsx";
import EditRole from "../pages/roles/editRoles/index.jsx"
import Services from "../pages/services/index.jsx"
import AddServices from "../pages/services/addServices/index.jsx";
import Orders from "../pages/orders/index.jsx";
import AddOrders from "../pages/orders/addOrders/index.jsx";
import EditOrders from "../pages/orders/editOrders/index.jsx";
import AddProducts from "../pages/products/addProducts/index.jsx";
import EditProducts from "../pages/products/editProducts/index.jsx";
import EditServices from "../pages/services/editServices/index.jsx";
import Employees from "../pages/employee/index.jsx";
import AddEmployees from "../pages/employee/addEmployees/index.jsx";
import EditEmployees from "../pages/employee/editEmployees/index.jsx";
import Statistics from "../pages/statistics/index.jsx";
import Container from "../ui/layout/Container.jsx";

export default function ApplicationRoutes() {

    return (
        <Routes>

            <Route
                path="/"
                element={< Statistics/>} 
            />
            <Route
                path="/Brands"
                element={<Container content={< AddBrands />} />}
            />
             <Route
                path="/login"
                element={<LoginPage />}
            />

        </Routes>
    )
}