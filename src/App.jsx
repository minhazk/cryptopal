import { Routes, Route } from 'react-router-dom';
import Entry from './pages/Entry';
import Home from './pages/Home';
import Thread from './pages/Thread';
import About from './pages/About';
import Profile from './pages/profile';
import Messaging from './pages/Messaging';
import { UserProvider } from './context/UserContext';
import { ThreadProvider } from './context/ThreadContext';

function App() {
    return (
        <UserProvider>
            <ThreadProvider>
                <Routes>
                    <Route path='/' element={<Entry />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/thread/:id' element={<Thread />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/profile/:id' element={<Profile />} />
                    <Route path='/messaging' element={<Messaging />} />
                </Routes>
            </ThreadProvider>
        </UserProvider>
    );
}

export default App;
