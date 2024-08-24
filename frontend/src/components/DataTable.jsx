import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

// Function to sort the data array
const getSortedData = (data, orderBy, order) => {
  return [...data].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
};

const DataTable = ({ securities }) => {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState("ticker");
  const [order, setOrder] = useState("asc");

  const [searchQuery, setSearchQuery] = useState("");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const gotToDetails = (id) => {
    navigate(`/securities/${id}`);
  };

  const getTrendCellBackgroundColor = (trend) => {
    if (trend >= -1 && trend < -0.2) {
      return "#FF696180";
    } else if (trend >= -0.2 && trend <= 0.2) {
      return "#23cc4580";
    } else if (trend > 0.2 && trend <= 1) {
      return "#0099ff80";
    } else {
      return "transparent";
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter securities based on the search query
  const filteredSecurities = securities.filter(
    (security) =>
      security.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      security.securityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      security.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      security.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      security.trend.toString().includes(searchQuery.toLowerCase())
  );

  const sortedSecurities = getSortedData(filteredSecurities, orderBy, order);

  //const sortedSecurities = getSortedData(securities, orderBy, order);

  return (
    <div className="w-full">
      <div className=" flex justify-between items-center">
        <h2 className="text-black">Securities</h2>
        <TextField
          label="Search"
          variant="outlined"
          margin="normal"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: 1 / 2, m: 2 }}
          className="max-w-xs"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className="">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sortDirection={orderBy === "ticker" ? order : false}>
                <TableSortLabel
                  active={orderBy === "ticker"}
                  direction={orderBy === "ticker" ? order : "asc"}
                  onClick={() => handleRequestSort("ticker")}
                >
                  Symbol
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={orderBy === "securityName" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "securityName"}
                  direction={orderBy === "securityName" ? order : "asc"}
                  onClick={() => handleRequestSort("securityName")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "sector" ? order : false}>
                <TableSortLabel
                  active={orderBy === "sector"}
                  direction={orderBy === "sector" ? order : "asc"}
                  onClick={() => handleRequestSort("sector")}
                >
                  Sector
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "country" ? order : false}>
                <TableSortLabel
                  active={orderBy === "country"}
                  direction={orderBy === "country" ? order : "asc"}
                  onClick={() => handleRequestSort("country")}
                >
                  Country
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "trend" ? order : false}>
                <TableSortLabel
                  active={orderBy === "trend"}
                  direction={orderBy === "trend" ? order : "asc"}
                  onClick={() => handleRequestSort("trend")}
                >
                  Trend
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedSecurities.map((row) => (
              <TableRow
                hover
                key={row.securityName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => gotToDetails(row.id)}
              >
                <TableCell component="th" scope="row">
                  {row.ticker}
                </TableCell>
                <TableCell>{row.securityName}</TableCell>
                <TableCell>{row.sector}</TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell
                  sx={{
                    backgroundColor: getTrendCellBackgroundColor(row.trend),
                  }}
                >
                  {row.trend}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
