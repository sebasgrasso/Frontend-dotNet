import { useNewTrendMutation } from "../../store/apis/microbApis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useNewTrend = () => {
    const [
        startNewTrendMutation,
    ] = useNewTrendMutation();

    const handleNewTrend = async (
        MinutosDesde: number,
    ) => {
        startNewTrendMutation({
            MinutosDesde
            }).unwrap()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then(() => {
                toast.success("Nuevos trends generados!", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
                toast.error(error.data.message + '!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    };

    return { handleNewTrend }
}
