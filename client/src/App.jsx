import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.configs";
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import PageWrapper from "./components/PageWrapper";
import routes from "./routes/routes";
import Dashboard from "./components/Dashboard";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode)
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      theme={themeMode}
      />
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<MainLayout/>}>
          {routes.mainRoutes.map((route, index) => (
            route.index ? (
              <Route
                index
                key={index}
                element={route.state ? (
                  <PageWrapper state={route.state}>{route.element}</PageWrapper>)
                  : route.element}
                  />
                ):(
                  <Route
                path={route.path}
                key={index}
                element={route.state ? (
                  <PageWrapper state={route.state}>{route.element}</PageWrapper>)
                  : route.element}
                  />
            )
          ))}
        </Route>

        <Route path="/dashboard" element={<Dashboard />}>
        {routes.adminRoutes.map((route, index) => (
                      <Route
                        path={route.path}
                        key={index}
                        element={<PageWrapper state={route.state}>{route.element}</PageWrapper>}
                      />
                    )
                  )}
        </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
