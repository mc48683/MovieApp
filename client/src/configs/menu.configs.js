import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import StarHalfOutlinedIcon from '@mui/icons-material/StarHalfOutlined';

const main = [
    {
        display: "home",
        path: "/",
        icon: <HomeOutlinedIcon/>,
        state: "home"
    },
    {
        display: "movies",
        path: "/movie",
        icon: <SlideshowOutlinedIcon/>,
        state: "movie"
    },
    {
        display: "tv series",
        path: "/tv",
        icon: <LiveTvOutlinedIcon/>,
        state: "tv"
    },
    {
        display: "search",
        path: "/search",
        icon: <SearchOutlinedIcon/>,
        state: "search"
    },
]

const user = [
    {
        display: "favorites",
        path: "/favorites",
        icon: <FavoriteBorderOutlinedIcon/>,
        state: "favorite"
    },
    {
        display: "reviews",
        path: "/reviews",
        icon: <RateReviewOutlinedIcon/>,
        state: "review"
    }
]

const admin = [
    {
        display: "dashboard",
        path: "/dashboard/home",
        icon: <HomeOutlinedIcon/>,
        state: "dashboard"
    },
    {
        display: "users",
        path: "/dashboard/allusers",
        icon: <PeopleOutlineIcon/>,
        state: "allusers"
    },
    {
        display: "reviews",
        path: "/dashboard/allreviews",
        icon: <StarHalfOutlinedIcon/>,
        state: "allreviews"
    }
]

const menuConfigs = {main, user, admin}

export default menuConfigs;