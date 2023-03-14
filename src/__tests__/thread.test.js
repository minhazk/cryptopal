import { render, fireEvent, renderHook, waitFor } from '@testing-library/react';
import { CreateForm } from '../pages/Home/CreateForm';
import { useThreadContext, ThreadProvider } from '../contextThreadContext';

const mockThread = {
    title: 'Test Title',
    body: 'Test Body',
    tags: [],
};

describe('Create Thread', () => {
    test('should create a new thread with the given title, body, and tags', async () => {
        const screen = render(
            <ThreadProvider>
                <CreateForm />
            </ThreadProvider>
        );

        const titleInput = screen.getByTestId('title');
        const bodyInput = screen.getByTestId('body');

        fireEvent.changeText(titleInput, mockThread.title);
        fireEvent.changeText(bodyInput, mockThread.body);

        fireEvent.press(screen.getByTestId('createBtn'));

        let threadResult;
        const { result } = renderHook(() => useThreadContext(), { wrapper: ThreadProvider });
        await waitFor(async () => {
            threadResult = await result.current.createThread(mockThread.title, mockThread.body, mockThread.tags);
        });

        expect(threadResult).toEqual(mockThread);
    });
});

describe('Create Thread2', () => {
    test('should create a new thread with the given title, body, and tags', async () => {
        const screen = render(
            <ThreadProvider>
                <CreateForm />
            </ThreadProvider>
        );

        const titleInput = screen.getByTestId('title');
        const bodyInput = screen.getByTestId('body');

        fireEvent.changeText(titleInput, mockThread.title);
        fireEvent.changeText(bodyInput, mockThread.body);

        fireEvent.press(screen.getByTestId('createBtn'));

        let threadResult;
        const { result } = renderHook(() => useThreadContext(), { wrapper: ThreadProvider });
        await waitFor(async () => {
            threadResult = await result.current.createThread(mockThread.title, mockThread.body, mockThread.tags);
        });

        expect(threadResult).toEqual(mockThread);
    });
    test('should create a new thread with the given title, body, an2d tags', async () => {
        const screen = render(
            <ThreadProvider>
                <CreateForm />
            </ThreadProvider>
        );

        const titleInput = screen.getByTestId('title');
        const bodyInput = screen.getByTestId('body');

        fireEvent.changeText(titleInput, mockThread.title);
        fireEvent.changeText(bodyInput, mockThread.body);

        fireEvent.press(screen.getByTestId('createBtn'));

        let threadResult;
        const { result } = renderHook(() => useThreadContext(), { wrapper: ThreadProvider });
        await waitFor(async () => {
            threadResult = await result.current.createThread(mockThread.title, mockThread.body, mockThread.tags);
        });

        expect(threadResult).toEqual([mockThread]);
    });
    test('should create a new thread with the given title, body, an222d tags', async () => {
        const screen = render(
            <ThreadProvider>
                <CreateForm />
            </ThreadProvider>
        );

        const titleInput = screen.getByTestId('title');
        const bodyInput = screen.getByTestId('body');

        fireEvent.changeText(titleInput, mockThread.title);
        fireEvent.changeText(bodyInput, mockThread.body);

        fireEvent.press(screen.getByTestId('createBtn'));

        let threadResult;
        const { result } = renderHook(() => useThreadContext(), { wrapper: ThreadProvider });
        await waitFor(async () => {
            threadResult = await result.current.createThread(mockThread.title, mockThread.body, mockThread.tags);
        });

        expect(threadResult).toEqual(mockThread);
    });
});
