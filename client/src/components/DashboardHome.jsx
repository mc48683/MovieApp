import adminApi from "../api/modules/admin.api";
import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';
import GroupIcon from '@mui/icons-material/Group';
import { useSelector } from 'react-redux';

const DashboardHome = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]);

  const { user } = useSelector((state) => state.user);
  console.log(user)

  useEffect(() => {
    const getReviews = async () => {
      const { response, err } = await adminApi.getReviews();

      if (err) toast.error(err.message);
      if (response) {
        setReviews([...response]);
        setReviewCount(response.length)
      }
    };

    getReviews();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const { response, err } = await adminApi.getUsers();

      if (err) toast.error(err.message);
      if (response) {
        setUsers([...response]);
        setUserCount(response.length);
      }
    };

    getUsers();
  }, []);

  
  return (
    <Stack direction="row" spacing={5}>
    <Stack sx={{ backgroundColor: "#212121", borderRadius: "5%", padding: 2}}>
      <Typography variant="subtitle1">Reviews</Typography>
      <Stack direction="row" spacing={10} alignItems="center">
        <Typography variant="h4">{reviewCount}</Typography>
        <StarHalfOutlinedIcon sx={{fontSize: "2.5rem"}}/>
      </Stack>
    </Stack>
    <Stack sx={{ backgroundColor: "#212121", borderRadius: "10%", padding: 2}}>
      <Typography variant="subtitle1">Users</Typography>
      <Stack direction="row" spacing={10}  alignItems="center">
        <Typography variant="h4">{userCount}</Typography>
        <GroupIcon sx={{fontSize: "2.5rem"}}/>
      </Stack>
    </Stack>
    </Stack>
  )
}

export default DashboardHome;