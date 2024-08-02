import React, { useEffect, useState } from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, styled, Icon, Drawer, List, TextField, ListItem, ListItemButton, ListItemText, Autocomplete} from "@mui/material";
import {Menu, ChevronLeft, Search, Home, Favorite, Logout} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [open, setOpen] = React.useState(false);

    const drawerWidth = 240;

    const [cryptoData, setCryptoData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      handleDrawerClose();
      const fetchData = async () => {
        try {
          const response = await fetch('/api/coins', {
            method: "GET"
          });
          if (response.ok) {
            const data = await response.json();
            console.log("data: ", data)
            const newArr = data.coinList.data.items;
            setCryptoData(newArr);
          } else {
            throw new Error(`Error: ${response.status}`);
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, []);

    
    useEffect(() => {
      let options = cryptoData.map(function (coin) {
        return { id: coin.id, name : coin.name, label: coin.name, logo: coin.logo };
      })
      setFilteredData(options);
    }, [searchTerm, cryptoData]);

    const AppBarStyled = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    }));
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    // const StyledInputBase = styled(InputBase)(({ theme }) => ({
    //   color: 'inherit',
    //   width: '100%',
    //   '& .MuiInputBase-input': {
    //     padding: theme.spacing(1, 1, 1, 0),
    //     // vertical padding + font size from searchIcon
    //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //     transition: theme.transitions.create('width'),
    //     [theme.breakpoints.up('sm')]: {
    //       width: '12ch',
    //       '&:focus': {
    //         width: '24ch',
    //       },
    //     }
    //   },
    // }));

    return (
    <Box sx={{ flexGrow: 1, mb:4 }}>
        <AppBarStyled position="static" open={open}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                <Menu />
                </IconButton>
                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'block' } }}
                    color="primary.contrastText"
                >
                CryptoShield
                </Typography>
                <Autocomplete
                  id="bitcoin-select"
                  className='MuiAutocomplete-popupIcon'
                  //popupIcon= {() => <Icon>Search</Icon>}
                  //forcePopupIcon='true'
                  sx={{ width: {xs: '20ch', md: '35ch' } }}
                  options={filteredData}
                  autoHighlight
                  getOptionLabel={(option) => option.name}
                  disableClearable
                  renderOption={(props, option) => {
                    const { key, ...optionProps } = props;
                    return (
                      <Link key={option.name} to={`/coinpage/${option.id}`} style={{ textDecoration: 'none'}}>
                        <Box
                          key={key}
                          component="li"
                          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                          {...optionProps}
                        >
                          <img
                            loading="lazy"
                            width="20"
                            srcSet={option.logo}
                            src={option.logo}
                            alt={option.name}
                          />
                          {option.name}
                        </Box>
                      </Link>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search a Cyptocurrency"
                      inputProps={{
                        ...params.inputProps
                      }}
                    />
                  )}
                />
            </Toolbar>
        </AppBarStyled>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        
        <List>
          {[['Home',"/homepage", <Home/>], ['Favorites',"/favorites", <Favorite/>], ['Sign out',"/", <Logout/>]].map((arr, index) => (
            <Link to={arr[1]} style={{textDecoration: 'none'}} onClick={handleDrawerClose}>
              <ListItem key={index} disablePadding>
                <ListItemButton>
                      {arr[2]}
                      <ListItemText sx={{ml:"2ch"}} primary={arr[0]} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
    )
}
export default NavBar;
