import { useDeletePostMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useDeletePost = () => {
    const [
        startDeletePostMutation,{
            isLoading,
            status ,
            error,
            isError,
            isSuccess,
            data,
          }
    ] = useDeletePostMutation();

    const handleDeletePost = async ({id}:{id:string}) => {
        startDeletePostMutation(
            {id}
        ).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((resp) => {
                toast.success("Post eliminado con éxito", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
                toast.error("Error al intentar eliminar el post", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    };

    return { 
        handleDeletePost,
        isLoading,
        status,
        error,
        isError,
        isSuccess,
        data, 
    }
}
