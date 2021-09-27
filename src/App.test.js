import { render, screen } from '@testing-library/react';
import App from './App';
import Sidebar from './components/Sidebar/Sidebar';

test('renders home with title', () => {
    const mockUser = {
        first_name: 'firstName',
        last_name: 'lastName',
        email: 'example@email.com'
    }
    render(<Sidebar currentUser={mockUser}/>);
    const linkElement = screen.getByText(/firstName lastName/i);
    expect(linkElement).toBeInTheDocument();
});