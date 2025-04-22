import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import Students from "../pages/students/index.jsx";
import Statistics from "../pages/statistics/index.jsx";
import Container from "../ui/layout/Container.jsx";

export default function ApplicationRoutes() {

    return (
        <Routes>

            <Route
                path="/"
                element={< Statistics />}
            />
            <Route
                path="/students"
                element={<Container content={< Students />} />}
            />
            <Route
                path="/login"
                element={<LoginPage />}
            />

        </Routes>
    )
}