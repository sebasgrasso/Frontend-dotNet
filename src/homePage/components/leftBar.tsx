import React from 'react';
import { Paper, Typography } from '@mui/material';
import { useGetTrendsQuery } from '../../store/apis/microbApis';

const LeftBar: React.FC = () => {
  const {data:trends} = useGetTrendsQuery();
  
  return (
    <>
      <Paper sx={{padding: '20px',marginTop: '20px'}}>
        <Typography variant="h6">Microb.uy</Typography>
        <Typography variant="body2">Esto esta en desarrollo para .NET</Typography>
      </Paper>
      <Paper sx={{padding: '20px',marginTop: '20px'}}>
        <Typography variant="h4">Trends</Typography>
        {trends?.map((trend) => (
              <Typography variant="h6">{trend.keyword}</Typography>
          ))}
        <Typography variant="body2"></Typography>
      </Paper>
    </>
  );
}

export default LeftBar;