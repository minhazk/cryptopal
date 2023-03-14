import { render, fireEvent, renderHook, waitFor } from '@testing-library/react';
import { useUserContext, UserProvider } from '../context/UserContext';
import SignInForm from '../pages/Entry/SignInForm';
import SignUpForm from '../pages/Entry/SignUpForm';

const mockUser = {
    email: 'test@example.com',
    password: 'password123',
};

describe('Sign In User', () => {
    test('should sign in the user from the database', async () => {
        const screen = render(
            <UserProvider>
                <SignInForm />
            </UserProvider>
        );

        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');

        fireEvent.changeText(emailInput, {
            target: { value: mockUser.email },
        });
        fireEvent.changeText(passwordInput, {
            target: { value: mockUser.password },
        });

        fireEvent.press(screen.getByTestId('loginBtn'));

        const mockSignInWithEmailAndPassword = jest.fn().mockResolvedValue({ user: mockUser });
        jest.mock('./firebase', () => ({
            ...jest.requireActual('./firebase'),
            signInWithEmailAndPassword: () => mockSignInWithEmailAndPassword(),
        }));

        let user;
        const { result } = renderHook(() => useUserContext(), { wrapper: UserProvider });
        await waitFor(async () => {
            user = await result.current.signInUser('test@example.com', 'password123');
        });

        expect(user.email).toEqual(mockUser.email);
    });
});

describe('Sign Up User', () => {
    test('should sign up the user and create a new document in the database', async () => {
        const screen = render(
            <UserProvider>
                <SignUpForm />
            </UserProvider>
        );

        const displayNameInput = screen.getByTestId('displayName');
        const emailInput = screen.getByTestId('email');
        const passwordInput = screen.getByTestId('password');

        fireEvent.changeText(displayNameInput, {
            target: { value: 'Test User' },
        });
        fireEvent.changeText(emailInput, {
            target: { value: 'test23@example.com' },
        });
        fireEvent.changeText(passwordInput, {
            target: { value: 'password123' },
        });

        fireEvent.press(screen.getByTestId('registerBtn'));

        const mockCreateUserWithEmailAndPassword = jest.fn().mockResolvedValue({ user: mockUser });
        const mockGetAuth = jest.fn().mockReturnValue({
            currentUser: { uid: 'mockUserId', metadata: { createdAt: new Date() }, photoURL: null },
        });
        const mockSetDoc = jest.fn().mockResolvedValue({});
        jest.mock('./firebase', () => ({
            ...jest.requireActual('./firebase'),
            getAuth: () => mockGetAuth(),
            createUserWithEmailAndPassword: () => mockCreateUserWithEmailAndPassword(),
            setDoc: () => mockSetDoc(),
        }));

        let user;
        const { result } = renderHook(() => useUserContext(), { wrapper: UserProvider });
        await waitFor(async () => {
            user = await result.current.signUpUser('Test User', 'test@example.com', 'password123');
        });

        expect(user.email).toEqual(mockUser.email);
    });
});
