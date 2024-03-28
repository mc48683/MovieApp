import React from 'react';
import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import Logo from "./Logo";
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';


const actionState = {
    login: "login",
    register: "register"
}

const AuthModal = () => {

  const { authModalOpen } = useSelector((state) => state.authModal);

  const dispatch = useDispatch();

  const [action, setAction] = useState(actionState.login);

  useEffect(() => {
    if (authModalOpen) setAction(actionState.login)
  }, [authModalOpen])

  const handleClose = () => dispatch(setAuthModalOpen(false))

  const switchAuthState = (state) => setAction(state);

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                maxWidth: "500px",
                padding: 4,
                outLine: "none"
            }}>
              <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: "background.paper"}}>
                <Box sx={{ textAlign: "left", marginLeft: "1rem", marginBottom: "1.5rem" }}>
                <Typography variant="h4" fontWeight="500" textTransform="capitalize">
                    {action}
                </Typography>
                </Box>

                {action === actionState.login && <LoginForm switchAuthState={() => switchAuthState(actionState.register)}/>}

                {action === actionState.register && <RegisterForm switchAuthState={() => switchAuthState(actionState.register)}/>}
              </Box>
        </Box>
    </Modal>
  );
};

export default AuthModal;