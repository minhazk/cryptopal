import { Routes, Route } from 'react-router-dom';
import Entry from './pages/Entry';
import Home from './pages/Home';
import Thread from './pages/Thread';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Entry />} />
            <Route path='/home' element={<Home />} />
            <Route path='/thread/:id' element={<Thread />} />
        </Routes>
    );
}

export default App;
