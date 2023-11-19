import React, { useState, useEffect } from 'react';
import LeftBar from '../components/leftBar.tsx';
import Feed from '../components/feed.tsx';
import RightBar from '../components/rightBar.tsx';
import { Container, Grid, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const HomePage = () =>{
    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 300){
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 300){
            setShowScroll(false)
        }
    };

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)
        return function cleanup() {
            window.removeEventListener('scroll', checkScrollTop)
        };
    });

    return (
        <div style={{ backgroundColor: "#191b22", minHeight: "100vh" }}>
        <Container style={{ backgroundColor: "#191b22", minHeight: "100vh"}}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <LeftBar  />
            </Grid>
            <Grid item xs={6}>
              <Feed />
            </Grid>
            <Grid item xs={3}>
              <RightBar />
            </Grid>
          </Grid>
        </Container>
        {showScroll && 
            <Fab color="primary" size="medium" onClick={scrollTop} style={{position: 'fixed', bottom: '20px', left: '20px'}}>
                <KeyboardArrowUpIcon />
            </Fab>
        }
        </div>
      );
}
