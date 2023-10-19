import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    padding: '20px',
    backgroundColor: '#191b22', // Ajustar según necesidad
    color: '#191b22'
  },
  rootDiff: {
    padding: '20px',
    marginTop: '20px',
    backgroundColor: '#282c37',
    color: '#282c37',
  },
  scrollableFeed: {
    height: '100vh', 
    overflowY: 'auto',
  },
  
});

export default useStyles;