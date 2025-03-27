import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    CircularProgress
} from '@mui/material';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { showError } = useNotification();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            if (formData.email !== 'eve.holt@reqres.in' || formData.password !== 'cityslicka') {
                throw new Error('Invalid credentials');
            }

            const response = await axios.post('https://reqres.in/api/login', {
                email: formData.email,
                password: formData.password
            });

            login(response.data.token);
            navigate('/');
        } catch (error) {
            if (error.message === 'Invalid credentials') {
                showError('Invalid email or password. Use: eve.holt@reqres.in / cityslicka');
            } else if (error.response && error.response.status === 400) {
                showError('Login failed. Please check your credentials.');
            } else {
                showError('An error occurred. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <Paper elevation={6} sx={{
                p: 4,
                width: '100%',
                maxWidth: 400,
                borderRadius: 2
            }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
                    Login
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={!!errors.email}
                        helperText={errors.email}
                        placeholder="eve.holt@reqres.in"
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        error={!!errors.password}
                        helperText={errors.password}
                        placeholder="cityslicka"
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        sx={{ mt: 3, py: 1.5 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Login'}
                    </Button>
                </form>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Required credentials: eve.holt@reqres.in / cityslicka
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;