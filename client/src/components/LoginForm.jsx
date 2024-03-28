import React from 'react';
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from 'react';
import { useDispatch,  useSelector } from 'react-redux';
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../api/modules/user.api";
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { setUser } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import store from '../redux/store';

const LoginForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();


  const loginForm = useFormik({
    initialValues: {
        password: "",
        username: ""
    },
    validationSchema: Yup.object({
        username: Yup.string()
        .required("username is required"),
        password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
    }),
    onSubmit: async values => {
        setErrorMessage(undefined)
        setIsLoginRequest(true)
        const { response, err } = await userApi.login(values)
        setIsLoginRequest(false)

        if (response) {
            loginForm.resetForm();
            dispatch(setUser(response));
            dispatch(setAuthModalOpen(false));
            toast.success("Login success");
            const state = store.getState();
            if (state.user.user.isAdmin) navigate("/dashboard/home");
            
        }

        if (err) setErrorMessage(err.message)
    }
  })

  return (
    <Box component="form" onSubmit={loginForm.handleSubmit}>
        <Stack spacing={3}>
            <TextField
                type="text"
                placeholder="Username"
                name="username"
                fullWidth
                value={loginForm.values.username}
                onChange={loginForm.handleChange}
                color="success"
                error={loginForm.touched.username && loginForm.errors.username !== undefined}
                helperText={loginForm.touched.username && loginForm.errors.username !== undefined}
            />
            <TextField
                type="password"
                placeholder="Password"
                name="password"
                fullWidth
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                color="success"
                error={loginForm.touched.password && loginForm.errors.password !== undefined}
                helperText={loginForm.touched.password && loginForm.errors.password !== undefined}
            />
        </Stack>
        <LoadingButton
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            sx={{ marginTop: 4 }}
            loading={isLoginRequest}
        >
            Login
        </LoadingButton>
        <Button
            fullWidth
            sx={{ marginTop: 1 }}
            onClick={() => switchAuthState()}
        >
            Register
        </Button>

        {errorMessage && (
        <Box sx={{ marginTop: 2}}>
            <Alert severity="error" variant="outlined">{errorMessage}</Alert>
        </Box>
        )}
    </Box>
  );
};

export default LoginForm;