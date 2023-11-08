import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { HomePage } from "../homePage/homePage";
import { PostPage } from "../posts/pages/postPage";
import { useAppSelector } from "../hooks/hooks";
import { UserRoutes } from "./UserRoutes";
import useRouteChangeMiddleware from "../hooks/useRouteChangeMiddleware";

export const AppRouter = () => {
  const {status} = useAppSelector((state)=>state.auth);
  const cargando = useRouteChangeMiddleware(); 
  //HAY QUE HACER QUE SI LA INSTANCIA EN REDUX/LOCALSTORAGE ES DISTINTA A LA DE LA URL NO RENDERICE Y GUARDE LA NUEVA URL INSTANCIA
  if(!cargando)
  return (
    <>
      <CssBaseline />
      <Routes>
        { status !=="authenticated" ? 
          (<Route path="/:instanciaX/*" element={<HomePage/>}/>)
          : 
          (<Route path="/:instanciaX/*" element={<UserRoutes/>} />)

        }
        <Route path="/:instanciaX/post/:id" element={<PostPage/>} />
      </Routes>
    </>
    
  );
};

