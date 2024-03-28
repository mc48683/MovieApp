import HomePage from "../pages/HomePage";
import FavoriteList from "../pages/FavoriteList";
import MediaDetail from "../pages/MediaDetail";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";
import ReviewList from "../pages/ReviewList";
import ProtectedPage from "../components/ProtectedPage";
import ProtectedRoute from "../components/ProtectedRoute";
import UsersList from "../pages/UsersList";
import ReviewsList from "../pages/ReviewsList";
import DashboardHome from "../components/DashboardHome";

export const routesGen = {
    home: "/",
    mediaList: (type) => `/${type}`,
    mediaDetail: (type, id) => `/${type}/${id}`,
    mediaSearch: "/search",
    favoriteList: "/favorites",
    reviewList: "/reviews",
}

const mainRoutes = [
    {
        index: true,
        element: <HomePage />,
        state: "home"
    },
    {
        path: "/search",
        element: <MediaSearch />,
        state: "search"
    },
    {
        path: "/favorites",
        element: (
            <ProtectedPage>
            <FavoriteList />
            </ProtectedPage>
        ),
        state: "favorites"
    },
    {
        path: "/reviews",
        element: (
            <ProtectedPage>
            <ReviewList />
            </ProtectedPage>
        ),
        state: "reviews"
    },
    {
        path: "/:mediaType",
        element: <MediaList />,
    },
    {
        path: "/:mediaType/:mediaId",
        element: <MediaDetail />
    }

];

const adminRoutes = [
    {
        path: "/dashboard/home",
        element: (
            <ProtectedRoute>
            <DashboardHome />
            </ProtectedRoute>
        ),
        state: "dashboard"
    },
    {
        path: "/dashboard/allusers",
        element: (
            <ProtectedRoute>
            <UsersList />
            </ProtectedRoute>
        ),
        state: "users"
    },
    {
        path: "/dashboard/allreviews",
        element: (
            <ProtectedRoute>
            <ReviewsList />
            </ProtectedRoute>
        ),
        state: "reviews"
    }
]

const routes = {mainRoutes, adminRoutes}

export default routes;