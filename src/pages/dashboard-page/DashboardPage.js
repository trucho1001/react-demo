import React, { useState, useContext, useEffect } from "react";
import AlgoliaApiService from "../../api/AlgoliaApiService";
import { debounce } from "../../utils/Utils";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
export const DashboardPage = (props) => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);

  const getData = async () => {
    let result = await AlgoliaApiService.getAll(value);
    setItems(result.hits);
  };

  const changeHandler = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value != "") getData();
  }, [value]);

  const debouncedChangeHandler = debounce(changeHandler, 500);

  return (
    // <div className="padding-1">
    //   <input
    //     onChange={debouncedChangeHandler}
    //     placeholder="Type something"
    //     className="margin bottom-1 padding-1"
    //   />
    //   {items.map((item, index) => (
    //     <div><a key={index} href={item.url} title={item.title} target="_blank">{item.title}</a></div>
    //   ))}
    // </div>
    <div className="padding-1">
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search debounce"
        inputProps={{ 'aria-label': 'Search debounce' }}
        onChange={debouncedChangeHandler}
        placeholder="Type something"
        // className="margin bottom-1 padding-1"
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
      </Paper>
      {items.map((item, index) => (
        <div><a key={index} href={item.url} title={item.title} target="_blank">{item.title}</a></div>
      ))}
      </div>
  );
};
