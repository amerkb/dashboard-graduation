
import { useState } from "react";
import { LoginForm } from "../../lib/actions";  
import { useNavigate } from "react-router-dom";

export default function LoginUi() {  
    
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        setLoading(true);
      const result = await LoginForm(new FormData(e.target), navigate);
      if(result){
        setLoading(false);
      }
    };  

    const navigate = (route) => {
        nav(route);
    };

    return (  
        <form onSubmit={handleSubmit}>  
            <div className="mb-4">  
                <label className="block text-gray mb-1">اسم المستخدم</label>  
                <input  
                    type="text"  
                    name="email"  
                    className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"  
                    placeholder="أدخل اسم المستخدم"  
                />  
            </div>  
            <div className="mb-4">  
                <label className="block text-gray mb-1">كلمة المرور</label>  
                <input  
                    type="password"  
                    name="password"  
                    className="w-full px-4 py-2 border border-orange rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"  
                    placeholder="أدخل كلمة المرور"  
                />  
            </div>  
            <button  
                disabled={loading}
                type="submit"  
                className="w-full bg-orange flex justify-center text-white py-2 rounded-lg hover:bg-orange transition"  
            >  
                {loading ? <div className=" animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-6 h-6"></div> : "تسجيل الدخول "} 
            </button>  
        </form>  
    );  
};