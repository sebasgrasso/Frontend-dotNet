import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    padding: '20px',
    marginTop: '20px',
    backgroundColor: '#191b22',
    color: '#191b22',
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
    //esconder la barra de scroll
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  // ... otros estilos según necesidad
});

export default useStyles;