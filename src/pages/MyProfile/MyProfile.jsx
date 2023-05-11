import React from "react";
import {
  Container,
  Box,
  CssBaseline,
  Typography,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { handleFirebaseError } from "../../config/firebase";
import { updateSpecificDocumentInCollection } from "../../services/user.firebase";
import { useAlert } from "@blaumaus/react-alert";
import { useAuth } from "../../context/AuthProvider";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
});

export const MyProfile = () => {
  const alert = useAlert();
  const { user, setUser } = useAuth();
  const defaultValues = { name: user.name, email: user.email };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { name, email } = data;

    const newName = name !== user.name ? name : user.name;
    const newEmail = email !== user.email ? email : user.email;
    try {
      await updateSpecificDocumentInCollection("users", user.uid, {
        name: newName,
        email: newEmail,
      });
      setUser({ ...user, name: newName, email: newEmail });
      alert.success("User updated successfully");
    } catch (err) {
      alert.error(handleFirebaseError(err.code));
    }
  };

  return (
    <Container>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography component="h1" variant="h5">
          My Account
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                {...register("name")}
                error={errors.name ? true : false}
                helperText={errors.name ? errors.name.message : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register("email")}
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : null}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
