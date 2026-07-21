import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);
    setSubmitting(true);
    try {
      await login(values);
      navigate("/dashboard");
    } catch (err: any) {
      setServerError(
        err?.response?.data?.message ?? "Invalid username or password"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 px-4">
      <Paper elevation={3} className="w-full max-w-md rounded-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-900 rounded-full p-3 mb-3">
            <LockOutlined className="text-white" />
          </div>
          <Typography variant="h5" className="font-semibold">
            Sign in
          </Typography>
          <Typography variant="body2" className="text-slate-500 mt-1">
            Internal Reporting System
          </Typography>
        </div>

        {serverError && (
          <Alert severity="error" className="mb-4">
            {serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <TextField
            label="Username"
            fullWidth
            autoFocus
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={submitting}
            className="!mt-2 !bg-blue-900 hover:!bg-blue-800 !normal-case"
          >
            {submitting ? <CircularProgress size={24} color="inherit" /> : "Sign in"}
          </Button>
        </form>

        <Typography variant="caption" className="text-slate-400 block text-center mt-6">
          © {new Date().getFullYear()} Your Org. Internal use only.
        </Typography>
      </Paper>
    </div>
  );
}
