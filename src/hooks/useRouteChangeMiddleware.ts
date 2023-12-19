import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setInstance } from '../store/instance/instanceSlice';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getInstanciaStorage, limpiarInstancia, setInstanciaStorage } from '../utils/localstorage';
import { useAppSelector } from './hooks';
import { useAuth } from '../auth/hooks/useAuth';

function useRouteChangeMiddleware() {
    const [loading,setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentStoreInstance = useAppSelector((state)=>state.instance.alias)
    const { handleLogout } = useAuth();


  useEffect(() => {
    const checkInstanceAndFetchData = async () => {
      // Extract the instance identifier from the current path
    const pathParts = location.pathname.split('/');
    // Assuming 'instance1' is at the second segment of the URL ('/')
    const urlInstanceIdentifier = pathParts[1]; // This gets 'instance1' from the URL
    
    // Obtain current instance from the local storage
    const currentLocalInstance = getInstanciaStorage();
    if(currentLocalInstance?.alias!=urlInstanceIdentifier){
      handleLogout();
    }
    // Check if the local storage has a different value than the current path instance
    if (!currentLocalInstance || currentLocalInstance.alias !== urlInstanceIdentifier || !currentStoreInstance) {

      try {
          // Fetch new instance data from the global API
          const newInstanceData = await fetchDatosInstancia(urlInstanceIdentifier);
    
          // Save the new instance data to local storage
          dispatch(setInstance(newInstanceData))
          setInstanciaStorage({id:newInstanceData.id,alias:newInstanceData.alias})
          setLoading(false)
      } catch (error) {
          console.error('Error fetching new instance data:', error);
          // Redirect or handle error
          setLoading(false)
          if(urlInstanceIdentifier!=currentLocalInstance?.alias){
            limpiarInstancia();
            if(urlInstanceIdentifier!=""){
              navigate("/")
            }
            
          }
      }
    }
      
    };

    checkInstanceAndFetchData();
  }, [location, navigate]);

  async function fetchDatosInstancia(instanceIdentifier:string) {
    const response = await fetch(`https://api-microbuy.up.railway.app/instancias/alias/${instanceIdentifier}`);
    const data = await response.json();
    
    return data; // Make sure the API response has this structure or adjust as needed
  }

  return loading
}

export default useRouteChangeMiddleware;