import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import styled from 'styled-components';
import { useBody } from '../../hooks/useBody';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const Wrapper = styled.div`
  text-align: center;
`;

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { currFunc, setFunc} = useBody();

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleChange = (event) => {
    setAnchorEl(null);
    setFunc(event.currentTarget.id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Wrapper>
    <Box sx={{ flexGrow: 1, backgroundColor: 'black' }}>
      <AppBar position="sticky" style={{backgroundColor: "#202020"}}>
        <Toolbar>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography  variant="h6" component="div">
            MENU
          </Typography>
          <Menu
                value = {currFunc}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem id = "GaborTransform" onClick={handleChange}>Gabor Transform</MenuItem>
                <MenuItem id = "SpeedAdjustment" onClick={handleChange}>Speed Adjustment</MenuItem>
                <MenuItem id = "NoiseReductionEnhancement" onClick={handleChange}>Noise Reduction/Enhancement</MenuItem>
          </Menu>
          <Typography  style = {{fontWeight: "bold"}}variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Digital Signal Processing Toolkit
          </Typography>
          <Button color="inherit" onClick={event =>  window.location.href='http://disp.ee.ntu.edu.tw/'} style={{width: 100, height: 70, fontSize:"16px"}}>
            DISP Lab
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
    </Wrapper>
  );
}

export default Header;