import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { HomePage } from "../homePage/homePage";
import { PostPage } from "../posts/pages/postPage";
import { useAppSelector } from "../hooks/hooks";
import { UserRoutes } from "./UserRoutes";

export const AppRouter = () => {
  const {status} = useAppSelector((state)=>state.auth);
  
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

