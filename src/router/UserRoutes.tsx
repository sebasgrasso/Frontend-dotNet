import { Route, Routes } from "react-router-dom";
import { HomePage } from "../homePage/homePage";
import { PostPage } from "../posts/pages/postPage";
import { useAppSelector } from "../hooks/hooks";


export const UserRoutes = () => {
  //aca voy a agarrar nombre de instancia const { sucursal } = useAppSelector((state) => state.super5);
    const { role } = useAppSelector((state)=>state.auth)
  return (
    <>
    <Routes>
        {role==="User" || role==="Admin" && 
            <>
                <Route path="/" element={<HomePage />} />
                <Route path="post/:id" element={<PostPage/>} />
            </>
        }
      
        
      </Routes>
    </>
  );
};
