import React from 'react';
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../api/modules/user.api";
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { setUser } from '../redux/features/userSlice';

const RegisterForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const registerForm = useFormik({
    initialValues: {
        password: "",
        username: "",
        displayName: "",
        confirmPassword: ""
    },
    validationSchema: Yup.object({
        username: Yup.string()
        .required("username is required"),
        password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
        displayName: Yup.string()
        .required("Display name is required"),
        confirmPassword: Yup.string()
        .required("Confirm password is required"),
    }),
    onSubmit: async values => {
        setErrorMessage(undefined);
        setIsLoginRequest(true);
        const { response, err } = await userApi.register(values);
        setIsLoginRequest(false);

        if (response) {
            registerForm.resetForm();
            dispatch(setUser(response));
            dispatch(setAuthModalOpen(false));
            toast.success("Login success");
        }

        if (err) setErrorMessage(err.message)
    }
  })

  return (
    <Box component="form" onSubmit={registerForm.handleSubmit}>
        <Stack spacing={4}>
            <TextField
                type="text"
                placeholder="Username"
                name="username"
                fullWidth
                value={registerForm.values.username}
                onChange={registerForm.handleChange}
                color="success"
                error={registerForm.touched.username && registerForm.errors.username !== undefined}
                helperText={registerForm.touched.username && registerForm.errors.username !== undefined}
            />
            <TextField
                type="text"
                placeholder="Display name"
                name="displayName"
                fullWidth
                value={registerForm.values.displayName}
                onChange={registerForm.handleChange}
                color="success"
                error={registerForm.touched.displayName && registerForm.errors.displayName !== undefined}
                helperText={registerForm.touched.displayName && registerForm.errors.displayName !== undefined}
            />
            <TextField
                type="password"
                placeholder="Password"
                name="password"
                fullWidth
                value={registerForm.values.password}
                onChange={registerForm.handleChange}
                color="success"
                error={registerForm.touched.password && registerForm.errors.password !== undefined}
                helperText={registerForm.touched.password && registerForm.errors.password !== undefined}
            />
            <TextField
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                fullWidth
                value={registerForm.values.confirmPassword}
                onChange={registerForm.handleChange}
                color="success"
                error={registerForm.touched.confirmPassword && registerForm.errors.confirmPassword !== undefined}
                helperText={registerForm.touched.confirmPassword && registerForm.errors.confirmPassword !== undefined}
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
            Register
        </LoadingButton>
        <Button
            fullWidth
            sx={{ marginTop: 1 }}
            onClick={() => switchAuthState()}
        >
            Login
        </Button>

        {errorMessage && (
        <Box sx={{ marginTop: 2}}>
            <Alert severity="error" variant="outlined">{errorMessage}</Alert>
        </Box>
        )}
    </Box>
  );
};


export default RegisterForm;