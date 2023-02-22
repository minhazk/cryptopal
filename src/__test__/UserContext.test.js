import { useUserContext, UserProvider, UserContext } from '../context/UserContext';
import 'babel-polyfill';
import React, { useContext } from 'react';
import { render } from '@testing-library/react';

const MyComponent = () => {
    const { signUpUser } = useContext(UserContext);
    return <div>{signUpUser(1, 2, 3)}</div>;
};

describe('signUpUser', () => {
    test('should create a user and add it to the database', async () => {
        const user = { uid: '123', email: 'test@example.com', metadata: { createdAt: new Date() }, photoURL: 'https://example.com/image.png' };
        const displayName = 'Test User';
        const password = 'password123';

        const { getByText } = render(
            <UserProvider>
                <MyComponent />
            </UserProvider>
        );

        const signUpUser = jest.fn();

        // Replace the original signUpUser function with our mock function
        // so that we can spy on it and check if it was called with the right arguments.
        jest.spyOn(UserContext, 'useUserContext').mockReturnValue({ signUpUser });

        // Call the function that we want to test.
        getByText(/3/).click();
        await expect(signUpUser).toHaveBeenCalledWith(displayName, user.email, password);
    });
});
