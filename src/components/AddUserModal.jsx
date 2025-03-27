import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const AddUserModal = ({ open, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        avatar: 'https://reqres.in/img/faces/1-image.jpg' // Default avatar
    });
    const { token } = useAuth();
    const { showError } = useNotification();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await axios.post('https://reqres.in/api/users', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onSave();
            onClose();
        } catch (err) {
            showError('Failed to add user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New User</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    margin="normal"
                    label="First Name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Last Name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add User'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUserModal;