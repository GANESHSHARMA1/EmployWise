import { Component } from 'react';
import { Alert } from '@mui/material';

class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <Alert severity="error">Something went wrong</Alert>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;