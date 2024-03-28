import adminApi from "../api/modules/admin.api";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StarRateIcon from '@mui/icons-material/StarRate';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Stack, IconButton, TableFooter, TablePagination, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { yellow } from '@mui/material/colors';
import { LoadingButton } from "@mui/lab";
import reviewApi from "../api/modules/review.api";

const ReviewsList = () => {
  
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [createdAt, setCreatedAt] = useState([]);
  const [rate, setRate] = useState([]);
  const [title, setTitle] = useState([]);
  const [displayName, setDisplayName] = useState([]);
  const [onRequest, setOnRequest] = useState(false);

  const handleClickOpen = (id) => {
    let review = reviews.find(item => item.id === id)
    setContent(review.content);
    setCreatedAt(review.createdAt);
    setRate(review.rate);
    setTitle(review.mediaTitle);
    setDisplayName(review.displayName)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onRemove = async (id) => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await adminApi.removeReview({ reviewId: id });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Remove review success");
      if (reviews.findIndex(e => e.id === id) !== -1) {
        const newReviews = [...reviews].filter(e => e.id !== id)
        setReviews(newReviews);
    }
    
  };
}
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const getReviews = async () => {
      const { response, err } = await adminApi.getReviews();

      if (err) toast.error(err.message);
      if (response) {
        setReviews([...response]);
      }
    };

    getReviews();
  }, []);

  const rows = reviews;

  for (const object of rows) {
    object["actions"] = 
    <>
    <IconButton onClick={() => handleClickOpen(object["id"])} size="small"><RemoveRedEyeOutlinedIcon fontSize="inherit" /></IconButton>
    <LoadingButton
        startIcon={<DeleteIcon/>}
        loadingPosition="start"
        loading={onRequest}
        onClick={() => onRemove(object["id"])}
      >
    </LoadingButton>
    </>
  }


  for (const object of rows) {
    object["createdAt"] = dayjs(object["createdAt"]).format("DD-MM-YYYY");
  }

  const getDisplayName = async () => {
    for (const object of rows) {
      const { response, err } = await adminApi.getDisplayName({ userId: object["user"]});
      if (err) toast.error(err.message);
      if (response) {
        object['displayName'] = response.displayName;
      }
    }

  }

  getDisplayName();

  return (
    <>
        <Dialog color="primary" fullWidth open={open} onClose={handleClose}>
        <DialogTitle>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 2}}
          alignItems="center"
        >
         <Avatar variant="rounded" padding="20px"><PersonOutlineOutlinedIcon/></Avatar>
         <Stack direction="column" width="500px" >
          <Typography variant="h6" fontSize="15px">{title}</Typography>
          <Typography variant="subtitle1" fontSize="12px">{createdAt} by {displayName}</Typography>
         </Stack>
         <Stack direction="row" spacing={0.5} >
          <StarRateIcon sx={{ fontSize: 20, color: yellow[500]}}/>
          <Typography sx={{ fontSize: 15}}variant="subtitle1">{rate}</Typography>
         </Stack>
        </Stack>

        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
        </DialogContent>
      </Dialog>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Review</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Created At</TableCell>
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
              <TableCell align="right">{row.content}</TableCell>
              <TableCell align="right">{row.rate}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
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

export default ReviewsList;
