import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader, faClipboardUser, faPalette, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import "./Adminhome.css"

function AdminHome() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3002/ViewCourse").then((res) => {
            setCourses(res.data);
        });
    }, []);

    const navigate = useNavigate();

    const handleEnroll = (courseId) => {
        console.log("Enrolling in course with ID:", courseId);
        navigate("/course", { state: { courseId } });
    };
    return (
        <>
            <header className='bg-primary text-white fixed-top py-3 shadow-sm'>
                <div className='container d-flex justify-content-between align-items-center'>
                    <h1 className='mb-0'>Welcome,
                        {/* <span className="username-badge bg-white text-primary rounded-pill px-3 py-1 ms-2">{username}</span> */}
                    </h1>
                </div>
            </header>
            <div className="container-fluid m-0 pt-0">
                <div className="row">
                    <aside className="col-md-3 bg-dark text-white p-3 position-fixed vh-100" style={{ left: 0, top: '56px' }}>
                        <nav>
                            <ul className="list-unstyled">
                                <li className="mb-3 mt-3">
                                    <Link to="/" className="text-white d-flex align-items-center">
                                        <FontAwesomeIcon icon={faPalette} className="me-2" /> Dashboard
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link to="/add-course" className="text-white d-flex align-items-center">
                                        <FontAwesomeIcon icon={faBookOpenReader} className="me-2" /> Add Course
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link to="/add-staff" className="text-white d-flex align-items-center">
                                        <FontAwesomeIcon icon={faClipboardUser} className="me-2" /> Add Staff
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/active-users" className="text-white d-flex align-items-center">
                                        <FontAwesomeIcon icon={faUsers} className="me-2" /> Active Users
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                    <main className="col-md-9 ms-auto p-1" style={{ marginLeft: '25%', height: 'calc(100vh - 80px)' }}>
                       <section  className='course_card'>
                     {courses.map((course, index) => (
                <Card key={index}  className='Course_Card'>
                    <CardMedia 
                        component="img"
                        image={`http://localhost:3002/images/${course.course_image}`}
                        alt={course.course_name}
                        className='Course_Image'
                    />
                    <CardContent >
                        <Typography className='Course_Name'>
                            {course.course_name}
                        </Typography>
                        <Typography>
                            {course.course_description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => handleEnroll(course.course_id)} className='btn color-shift'><span>Hover Me</span>
                        </Button>
                    </CardActions>
                </Card>
            ))}
                </section>
                    </main>
                </div>
            </div>
        </>
    );
}

export default AdminHome;
