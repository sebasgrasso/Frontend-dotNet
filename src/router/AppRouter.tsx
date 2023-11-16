import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { HomePage } from "../homePage/pages/homePage";
import { PostPage } from "../posts/pages/postPage";
import { useAppSelector } from "../hooks/hooks";
import { UserRoutes } from "./UserRoutes";
import useRouteChangeMiddleware from "../hooks/useRouteChangeMiddleware";
import { DefaultPage } from "../homePage/pages/defaultPage";
import Authorized from "../auth/pages/authorized";

export const AppRouter = () => {
  const {status} = useAppSelector((state)=>state.auth);
  const cargando = useRouteChangeMiddleware(); 
  //HAY QUE HACER QUE SI LA INSTANCIA EN REDUX/LOCALSTORAGE ES DISTINTA A LA DE LA URL NO RENDERICE Y GUARDE LA NUEVA URL INSTANCIA
  if(!cargando)
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/:instanciaX/authorized" element={<Authorized/>} />
        { status !=="authenticated" ? 
          (<Route path="/:instanciaX/*" element={<HomePage/>}/>)
          : 
          (<Route path="/:instanciaX/*" element={<UserRoutes/>} />)
        }
        <Route path="/:instanciaX/post/:id" element={<PostPage/>} />
        <Route path="/" element={<DefaultPage/>} />
      </Routes>
    </>
    
  );
};

