import { Button } from '@mui/material';
import IconToggle from '../Header/IconToggle';
import { useNavigate } from "react-router-dom";

export const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // امسح الـ token من localStorage
    localStorage.removeItem("auth_token");
    // روح لصفحة تسجيل الدخول
    navigate("/login");
  };

  return (
    <header className="shadow-2xl p-4">
      <div className="container mx-auto flex items-center justify-between">
        <IconToggle onClick={toggleSidebar} />
        
        <Button 
          onClick={handleLogout} 
          variant="destructive" 
          className="ml-4"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};
