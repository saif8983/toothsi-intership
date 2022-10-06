import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Typography,
  stepConnectorClasses,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import style from "../utils/style";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
{
  /* That navbar by using material ui*/
}
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState("");
  const [size, setSize] = React.useState("");
  const handleChangeCategory = (categoryValue) => {
    setCategory(categoryValue);

    dispatch({
      type: "category",
      payload: { categoryValue },
    });
  };
  const handleChangeSize = (sizeValue) => {
    setSize(sizeValue);

    dispatch({
      type: "size",
      payload: { sizeValue },
    });
  };

  const selector = useSelector((state) => {
    return {
      productsData: state.Addproducts,
    };
  });
  const { productsData } = selector;
  //pass data on click of add to cart button
  const handleClick = (e) => {
    navigate("/addtocart");
    e.preventDefault();
    dispatch({
      type: "let addtocart",
      payload: { productsData },
    });
  };
  //function for reset the select option
  const handleReset = () => {
    handleChangeCategory("reset");
    handleChangeSize("reset");
  };
  //function for search
  const handleSearch = (searchValue) => {
    dispatch({
      type: "let search",
      payload: { searchValue },
    });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={style.backgroundOfNavbar}>
        <Toolbar>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Category</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={category}
              label="Age"
              onChange={(e) => handleChangeCategory(e.target.value)}
            >
              <MenuItem value="reset">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Hoodies">Hoddies</MenuItem>
              <MenuItem value="T-shirt">T-shirts</MenuItem>
              <MenuItem value="shirts">Shirts</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">size</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={size}
              label="Age"
              onChange={(e) => handleChangeSize(e.target.value)}
            >
              <MenuItem value="reset">
                <em>None</em>
              </MenuItem>
              <MenuItem value="xl">XL</MenuItem>
              <MenuItem value="xxl">XXL</MenuItem>
              <MenuItem value="xxxl">XXXL</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={() => handleReset()}>Reset</Button>
          <Typography style={style.colorSearchNavbar}>search:</Typography>
          <TextField
            sx={style.searchNavbar}
            label="Search"
            id="outlined-size-small"
            size="small"
            color="primary"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={(e) => handleClick(e)}
            sx={style.addToCartButton}
          >
            Add To Cart
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
