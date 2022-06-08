import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import AnimalApiService from "../../api/AnimalApiService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { MyTextField } from "../../components/my-text-field/MyTextField";
import { getComparator, stableSort } from "../../utils/Utils";

const headCells = [
  {
    id: "id",
    label: "Id",
  },
  {
    id: "age",
    numeric: true,
    disablePadding: false,
    label: "Age",
  },
  {
    id: "name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Animals{" "}
        <IconButton onClick={props.onAdd}>
          <AddIcon />
        </IconButton>
      </Typography>

      {numSelected > 0 ? (
        <>
          <Tooltip title="Update">
            <IconButton onClick={props.onUpdate}>
              <UpdateIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={props.onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export const SettingsPage = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [mode, setMode] = useState("");
  const [animalToAdd, setAnimalToAdd] = useState({
    age: "",
    name: "",
    type: "",
  });
  const [animalToUpdate, setAnimalToUpdate] = useState({
    age: "",
    name: "",
    type: "",
  });

  const getAnimals = async () => {
    let result = await AnimalApiService.getAnimals();
    setRows(result);
  };

  const deleteAnimal = async () => {
    let result = await AnimalApiService.deleteAnimal(selected[0]);
    if (result) {
      setSelected([]);
      setRows(rows.filter((item) => item.id != result.id));
    }
  };

  const addAnimal = async () => {
    let result = await AnimalApiService.addAnimal(animalToAdd);
    if (result) {
      setMode("");
      setRows([...rows, result]);
    }
  };

  const updateAnimal = async () => {
    let result = await AnimalApiService.updateAnimal(
      selected[0],
      animalToUpdate
    );
    if (result) {
      setMode("");
      setSelected([]);
      setRows([...rows.filter((item) => item.id != result.id), result]);
    }
  };

  useEffect(() => {
    getAnimals();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
    setAnimalToUpdate(rows.find((item) => item.id == newSelected[0]));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onDelete={(e) => deleteAnimal()}
            onUpdate={(e) => setMode("update")}
            onAdd={(e) => setMode("add")}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.id}
                        </TableCell>
                        <TableCell align="right">{row.age}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.type}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <Dialog open={mode == "add"}>
        <DialogTitle>{"Add animal"}</DialogTitle>
        <DialogContent>
          <MyTextField
            label="age"
            value={animalToAdd.age}
            onChange={(value) => setAnimalToAdd({ ...animalToAdd, age: value })}
          />
          <MyTextField
            label="name"
            value={animalToAdd.name}
            onChange={(value) =>
              setAnimalToAdd({ ...animalToAdd, name: value })
            }
          />
          <MyTextField
            label="type"
            value={animalToAdd.type}
            onChange={(value) =>
              setAnimalToAdd({ ...animalToAdd, type: value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => setMode("")}>Cancel</Button>
          <Button onClick={(e) => addAnimal()}>Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={mode == "update"}>
        <DialogTitle>{"Update animal"}</DialogTitle>
        <DialogContent>
          <MyTextField
            label="age"
            value={animalToUpdate?.age}
            onChange={(value) =>
              setAnimalToUpdate({ ...animalToUpdate, age: value })
            }
          />
          <MyTextField
            label="name"
            value={animalToUpdate?.name}
            onChange={(value) =>
              setAnimalToUpdate({ ...animalToUpdate, name: value })
            }
          />
          <MyTextField
            label="type"
            value={animalToUpdate?.type}
            onChange={(value) =>
              setAnimalToUpdate({ ...animalToUpdate, type: value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => setMode("")}>Cancel</Button>
          <Button onClick={(e) => updateAnimal()}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
