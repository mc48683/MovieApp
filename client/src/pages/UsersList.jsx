import adminApi from "../api/modules/admin.api.js";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { TableFooter, TablePagination, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Divider } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { useDispatch } from "react-redux";


const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [onRequest, setOnRequest] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const dispatch = useDispatch();


  const { user } = useSelector((state) => state.user);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onRemove = async (id) => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, err } = await adminApi.removeUser({ userId: id });
    setOnRequest(false);
    if (err) toast.error(err.message);
    if (response) {
      toast.success("Remove users success");
      if (users.findIndex(e => e.id === id) !== -1) {
        const newUsers = [...users].filter(e => e.id !== id)
        setUsers(newUsers);
      }
    }
    handleClose();
  };

  useEffect(() => {
    const getUsers = async () => {
      const { response, err } = await adminApi.getUsers();

      if (err) toast.error(err.message);
      if (response) {
        setUsers([...response]);
      }
    };

    getUsers();
  }, []);

  const rows = users;

  for (const object of rows) {
    object["actions"] = 
    <LoadingButton
        startIcon={<DeleteIcon/>}
        loadingPosition="start"
        loading={onRequest}
        onClick={() => handleClickOpen(object["id"])}
      >
    </LoadingButton>
  }

dispatch(setGlobalLoading(true));
  useEffect(() => {
    const getUserReviews = async () => { 
      for (const object of rows) {
      const { response, err } = await adminApi.getUserReviews({ userId: object["id"] });
      
      if (response) {
        object["reviewCount"] = response.length;
        console.log(object["reviewCount"])
      }

      if (err) {
        toast.error(err.message);
      }
  }};
    getUserReviews();
}, []);

dispatch(setGlobalLoading(false));


  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"xs
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Item delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure to permanently delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-around", p: 3 }}>
          <Button variant="contained" onClick={() => onRemove(id)}>Delete</Button>
          <Button sx={{ backgroundColor: "#757575" }} variant="contained" onClick={handleClose} autoFocus>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Review Count</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.displayName}</TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.reviewCount}</TableCell>
              <TableCell align="right">{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </>
  );
}

export default UsersList;