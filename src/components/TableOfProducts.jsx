import * as React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Paper from "@mui/material/Paper";
import style from "../utils/style";
import products from "../local-JSON/productsAPI.json";
import Navbar from "./Navbar";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
export default function AccessibleTable() {
  const dispatch = useDispatch();
  // data come from local json file
  const [productsData] = useState(products);
  const [productValue, setProductValue] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [data, setData] = useState([]);
  const [checked, setChecked] = useState();
  //Value of get by store category size and searchvalue
  const selector = useSelector((state) => {
    return {
      categoryValue: state.valueOfCategory,
      sizeValue: state.valueOfSize,
      searchValue: state.valueOfSearch,
    };
  });
  const { categoryValue, sizeValue, searchValue } = selector;
  //i have to make new obj for merge quantity which get by input
  const handleChange = (value) => {
    const obj = { qunatity: value };
    setQuantity({ ...quantity, ...obj });
  };
  //handleCheck funtion
  const handleCheck = (e, item, quantity) => {
    e.preventDefault();
    const productQuantity = { ...item, ...quantity };
    const productQuantityStrigfy = JSON.stringify(productQuantity);
    const productQuantityParse = JSON.parse(productQuantityStrigfy);
    // if checked the box value go to data in useEffect
    if (e.target.checked) {
      setChecked(true);
      setData(productQuantityParse);
    } else {
      setChecked(false);
      setData(productQuantityParse);
    }
  };
  useEffect(() => {
    // In use effect data go to store
    if (checked) {
      dispatch({
        type: "let product",
        payload: { data },
      });
    }
    //This is for uncheked for remove data from array of object to prevent mistkly checked
    else {
      dispatch({
        type: "let uncheckproduct",
        payload: { data },
      });
    }
  }, [data, checked]);
  useEffect(() => {
    setProductValue(productsData);
  }, [productsData]);
  useEffect(() => {
    setProductFilter(productsData);
  }, []);
  // For filter of Select option
  useEffect(() => {
    if (categoryValue && sizeValue) {
      const filterData = productValue.filter((item) => {
        return (
          (categoryValue == "" ||
            categoryValue == "reset" ||
            item.category === categoryValue) &&
          (sizeValue == "" || sizeValue == "reset" || item.size === sizeValue)
        );
      });
      setProductFilter(filterData);
    }
  }, [productValue, categoryValue, sizeValue]);
  //That is for search option
  useEffect(() => {
    if (searchValue) {
      const filterData = productValue.filter((item) => {
        return item.title.toLowerCase().startsWith(searchValue.toLowerCase());
      });
      setProductFilter(filterData);
    }
  }, [searchValue]);
  return (
    <>
      {/*Navbar render here */}
      <Navbar />
      {/*Table head is here*/}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow sx={style.tableHeadingCSS}>
              <TableCell>Image</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Buy</TableCell>
            </TableRow>
          </TableHead>
          {/*Table body  */}
          <TableBody>
            {productFilter.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <img src={row.image} />
                </TableCell>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.color}</TableCell>
                <TableCell align="right">In Stock</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={2}>
                    <TextField
                      id="outlined-size-small"
                      size="small"
                      onChange={(e) => handleChange(e.target.value)}
                      sx={style.inputQuantitycss}
                    />
                    <ShoppingCartIcon />
                    <Checkbox onChange={(e) => handleCheck(e, row, quantity)} />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
