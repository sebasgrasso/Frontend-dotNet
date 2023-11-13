import { Route, Routes } from "react-router-dom";
import { HomePage } from "../homePage/pages/homePage";
import { PostPage } from "../posts/pages/postPage";
import { useAppSelector } from "../hooks/hooks";
import AdminInstancia from "../backoffice/pages/adminInstancia";
import Profile from "../profile/components/profile";


export const UserRoutes = () => {
  //aca voy a agarrar nombre de instancia const { sucursal } = useAppSelector((state) => state.super5);
    const { role } = useAppSelector((state)=>state.auth)
  return (
    <>
    <Routes>
      <Route path="perfil/:id" element={<Profile/>} />
        {role==="User" && 
            <>
                <Route path="*" element={<HomePage />} />
                <Route path="post/:id" element={<PostPage/>} />
            </>
        }
        {(role ==="Admin" || role ==="Mod" ) && 
            <>
                <Route path="*" element={<HomePage />} />
                <Route path="administracion" element={<AdminInstancia />} />
                <Route path="post/:id" element={<PostPage/>} />
            </>
        }
      </Routes>
    </>
  );
};
