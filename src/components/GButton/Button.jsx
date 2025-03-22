import { useNavigate } from "react-router-dom";  

export default function Button({ width, height, padding, text, color, background, border, borderRadius, shadow, nav, fontSize, icon }) {  
    const navigate = useNavigate();  

    return (  
        <>  
            <button  
                style={{  
                    width: `${width}`,  
                    height: `${height}`,  
                    padding: `${padding}`,
                    color: `${color}`,  
                    backgroundColor: `${background}`,  
                    border: `${border}`,  
                    borderRadius:`${borderRadius}`,
                    boxShadow: `${shadow}`,  
                    fontSize: `${fontSize}`,
                    display : "flex",
                    justifyContent :"space-between",
                    alignItems : "center",
                    gap : "8px"
                }}  
                onClick={() => navigate(nav)}
            >  
                {text}  
                {icon}
            </button>  
        </>  
    );  
}