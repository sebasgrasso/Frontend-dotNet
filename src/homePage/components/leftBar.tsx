import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useGetTrendsQuery } from '../../store/apis/microbApis';
import { useNavigate } from 'react-router-dom';

const LeftBar: React.FC = () => {
  const {data:trends} = useGetTrendsQuery();
  const navigate = useNavigate();

  const pathParts = location.pathname.split('/');
  const urlSearchbar = pathParts[2];
  const urlInstancia = pathParts[1];

  return (
    <>
      <Paper sx={{padding: '20px',marginTop: '20px'}}>
        <Typography variant="h6">Microb.uy</Typography>
        <Typography variant="body2">Esto esta en desarrollo para .NET</Typography>
      </Paper>
      <Paper sx={{padding:"5px" ,marginTop: '20px'}}>
        <Typography fontSize={25} fontWeight={"bold"} sx={{marginLeft:"10px"}} >Últimas tendencias</Typography>
        {trends?.map((trend,index) => (
            <Box
              key={trend.keyword}
              onClick={()=>{
                if(urlSearchbar!="searchResults"){
                  navigate(`searchResults`, {state: trend.keyword})}
                else{
                  navigate(`/${urlInstancia}/searchResults`, {state:trend.keyword})
                  }
                }}
              sx={{backgroundColor:"white",
              width:"100%",
              color:"black", 
              ":hover":{
                backgroundColor:"#DCDCDC", 
                color:"black",
                borderColor:"blue",
                border:"1px "}}}
            >
              <Typography  fontSize={16} fontWeight={"bold"} key={index}>{trend.keyword} </Typography>
              <Typography fontSize={13}>{trend.cantidad} posts</Typography>
            </Box>
          ))}
        <Typography variant="body2"></Typography>
      </Paper>
    </>
  );
}

export default LeftBar;