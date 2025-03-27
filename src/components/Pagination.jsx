import { ButtonGroup, Button } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <ButtonGroup variant="outlined" sx={{ mt: 2 }}>
            {Array.from({ length: totalPages }, (_, i) => (
                <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? 'contained' : 'outlined'}
                    onClick={() => onPageChange(i + 1)}
                    sx={{ minWidth: 40 }}
                >
                    {i + 1}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default Pagination;