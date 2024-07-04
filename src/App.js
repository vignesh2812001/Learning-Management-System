import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminHome from './admin/AdminHome';
import AddCourse from './admin/AddCourse';
import './App.css';
import CourseCrud from './admin/CourseCrud';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AdminHome />} />
                <Route path="/add-course" element={<AddCourse />} />
                <Route path='/add-staff' element={<CourseCrud/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
