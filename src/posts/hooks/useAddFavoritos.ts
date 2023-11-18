import { useAddPostFavoritosMutation } from "../../store/apis/microbApis";
import 'react-toastify/dist/ReactToastify.css';

export const useAddFavorito = () => {
    const [
        startAddPostFavoritosMutation,
    ] = useAddPostFavoritosMutation();

    const handleAddFavorito = async (postID:string) => {
        startAddPostFavoritosMutation(
            postID
        ).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then(() => {
                
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch(() => {
               
            })
    };

    return { handleAddFavorito }
}
