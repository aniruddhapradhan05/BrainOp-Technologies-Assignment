import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import PostList from './components/PostList';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/SignUp" element={<Signup />} />
                <Route path="/PostList" element={<PostList/>} />
            </Routes>
        </Router>
    );
};

export default App;