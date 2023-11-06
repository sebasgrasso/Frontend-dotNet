import { useCreatePostMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostCreateDTO } from "../../interfaces/interfaces";

export const useCreatePost = () => {
    const [
        startCreatePostMutation,
    ] = useCreatePostMutation();

    const handleCreatePost = async (datosPost:PostCreateDTO) => {
        startCreatePostMutation(
            datosPost
        ).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((resp) => {
                toast.success("Post creado exitosamente!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
                toast.error("Error en la creacion del post!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    };

    return { handleCreatePost }
}
