import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import {
    Avatar, Box, Button, Container, IconButton, Paper,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TextField, Typography,
    Tabs, Tab, Grid, Card, CardContent, CardMedia,
    CircularProgress
} from '@mui/material';
import { Delete, Edit, TableChart, ViewModule } from '@mui/icons-material';
import axios from 'axios';
import Pagination from '../components/Pagination';
import EditUserModal from '../components/EditUserModal';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [viewMode, setViewMode] = useState('table');
    const [loadedCards, setLoadedCards] = useState(6);
    const [loadingMore, setLoadingMore] = useState(false);
    const { showSuccess, showError } = useNotification();
    const { token } = useAuth();

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
            setUsers(res.data.data);
            setTotalPages(res.data.total_pages);
        } catch (err) {
            showError('Failed to fetch users');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://reqres.in/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(user => user.id !== id));
            showSuccess('User deleted successfully');
        } catch (err) {
            showError('Failed to delete user');
        }
    };

    const handleUpdate = async (updatedUser) => {
        try {
            await axios.put(`https://reqres.in/api/users/${updatedUser.id}`, updatedUser, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.map(user =>
                user.id === updatedUser.id ? updatedUser : user
            ));
            showSuccess('User updated successfully');
            return true;
        } catch (err) {
            showError('Failed to update user');
            return false;
        }
    };

    const filteredUsers = users.filter(user =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const loadMoreCards = useCallback(() => {
        if (
            viewMode === 'card' &&
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 500 &&
            !loadingMore &&
            loadedCards < filteredUsers.length
        ) {
            setLoadingMore(true);
            setTimeout(() => {
                setLoadedCards(prev => prev + 6);
                setLoadingMore(false);
            }, 500);
        }
    }, [viewMode, loadingMore, loadedCards, filteredUsers.length]); // Only use length here

    useEffect(() => {
        window.addEventListener('scroll', loadMoreCards);
        return () => window.removeEventListener('scroll', loadMoreCards);
    }, [loadMoreCards]);



    const visibleCards = filteredUsers.slice(0, loadedCards);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' }
            }}>
                <TextField
                    label="Search Users"
                    variant="outlined"
                    size="small"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flexGrow: 1, width: { xs: '100%', sm: 'auto' } }}
                />

                <Tabs
                    value={viewMode}
                    onChange={(e, newValue) => setViewMode(newValue)}
                    sx={{ minHeight: 'auto', width: { xs: '100%', sm: 'auto' } }}
                >
                    <Tab
                        value="table"
                        icon={<TableChart />}
                        label="Table"
                        sx={{ minHeight: 'auto', py: 1 }}
                    />
                    <Tab
                        value="card"
                        icon={<ViewModule />}
                        label="Cards"
                        sx={{ minHeight: 'auto', py: 1 }}
                    />
                </Tabs>
            </Box>

            {viewMode === 'table' ? (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Avatar</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <Avatar src={user.avatar} />
                                        </TableCell>
                                        <TableCell>{user.first_name}</TableCell>
                                        <TableCell>{user.last_name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => setSelectedUser(user)}>
                                                <Edit color="primary" />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(user.id)}>
                                                <Delete color="error" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </Box>
                </>
            ) : (
                <>
                    <Grid container spacing={3} justifyContent="center">
                        {visibleCards.map((user) => (
                            <Grid item xs={11} sm={6} md={4} key={user.id}>
                                <Card sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    maxWidth: { xs: '90%', sm: '100%' },
                                    mx: 'auto'
                                }}>
                                    <CardMedia
                                        component="img"
                                        image={user.avatar}
                                        alt={`${user.first_name} ${user.last_name}`}
                                        sx={{
                                            height: 200,
                                            objectFit: 'cover',
                                            width: '100%'
                                        }}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {user.first_name} {user.last_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {user.email}
                                        </Typography>
                                    </CardContent>
                                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                        <IconButton onClick={() => setSelectedUser(user)}>
                                            <Edit color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(user.id)}>
                                            <Delete color="error" />
                                        </IconButton>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    {loadingMore && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <CircularProgress />
                        </Box>
                    )}
                </>
            )}

            <EditUserModal
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
                onSave={handleUpdate}
            />
        </Container>
    );
};

export default UserList;