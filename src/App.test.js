import { render, screen } from '@testing-library/react';
import App from './App';
import Sidebar from './components/Sidebar/Sidebar';
import {SnackbarProvider} from 'notistack';

test('renders home with title', () => {
    const mockUser = {
        first_name: 'firstName',
        last_name: 'lastName',
        email: 'example@email.com'
    }
    render(<SnackbarProvider><Sidebar currentUser={mockUser}/></SnackbarProvider>);
    const linkElement = screen.getByText(/firstName lastName/i);
    expect(linkElement).toBeInTheDocument();
});