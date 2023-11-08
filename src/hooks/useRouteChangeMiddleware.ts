import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setInstance } from '../store/instance/instanceSlice';
import { getInstanciaStorage, setInstanciaStorage } from '../utils/localstorage';

function useRouteChangeMiddleware() {
    const [loading,setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
  useEffect(() => {
    const checkInstanceAndFetchData = async () => {
      // Extract the instance identifier from the current path
    const pathParts = location.pathname.split('/');
    // Assuming 'instance1' is at the second segment of the URL ('/')
    const urlInstanceIdentifier = pathParts[1]; // This gets 'instance1' from the URL
    console.log("urlinstanceidentifier: ",urlInstanceIdentifier);
    
    const currentInstance = getInstanciaStorage();
    console.log("currentInstance: ",currentInstance);
    
    // Check if the local storage has a different value than the current path instance
    if (!currentInstance || currentInstance.alias !== urlInstanceIdentifier) {
    try {
        // Fetch new instance data from the global API
        console.log("entre al try");
        
        const newInstanceData = await fetchGlobalAPI(urlInstanceIdentifier);
        
        // Save the new instance data to local storage
        dispatch(setInstance(newInstanceData))
        setInstanciaStorage({id:newInstanceData.id,alias:newInstanceData.alias})
        setLoading(false)
        // Update the state in your app with the new data if needed
        // Using React Context or another state management library would be a good choice
    } catch (error) {
        console.error('Error fetching new instance data:', error);
        // Redirect or handle error
        setLoading(false)
    }
      }
    };

    checkInstanceAndFetchData();
  }, [location, navigate]);

  async function fetchGlobalAPI(instanceIdentifier:string) {
    const response = await fetch(`http://localhost:5245/instancias/alias/${instanceIdentifier}`);
    const data = await response.json();
    
    return data; // Make sure the API response has this structure or adjust as needed
  }

  return loading
}

export default useRouteChangeMiddleware;