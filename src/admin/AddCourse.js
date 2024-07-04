import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faBookOpenReader, faClipboardUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddCourse.css";

function AddCourse() {
    const [formData, setFormData] = useState({
        course_name: "",
        course_title: "",
        course_description: "",
        course_image: "",
        course_logo: "",
        course_contents: "",
        course_pdf : "",
    });

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInput = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleFileInput = (e) => {
        const { id, files } = e.target;
        setFormData({ ...formData, [id]: files[0] });
    };

    const handleSubmitCourse = (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append("course_name", formData.course_name);
        formDataToSend.append("course_title", formData.course_title);
        formDataToSend.append("course_description", formData.course_description);
        formDataToSend.append("course_image", formData.course_image);
        formDataToSend.append("course_logo", formData.course_logo);
        formDataToSend.append('course_pdf', formData.course_pdf );
        formDataToSend.append("course_contents", formData.course_contents);

        axios.post("http://localhost:3002/AddCourses", formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then((res) => {
                console.log("Course added successfully", res.data);
                setFormData({
                    course_name: "",
                    course_title: "",
                    course_description: "",
                    course_image: "",
                    course_logo: "",
                    course_contents: "",
                    course_pdf : "",

                });
                document.getElementById("course_image").value = null;
                document.getElementById("course_logo").value = null;
                document.getElementById("course_pdf").value = null;
                fetchCourses();
            })
            .catch((err) => {
                console.log("Error: ", err);
                setError("An error occurred while adding the course.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchCourses = () => {
        axios.get("http://localhost:3002/ViewCourse")
            .then((res) => {
                console.log(res.data);
                setCourses(res.data);
            })
            .catch((err) => {
                console.log("Error: ", err);
                setError("An error occurred while fetching courses.");
            });
    };



    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <>
            <header className="bg-light fixed-top py-3 shadow-sm d-flex align-items-center">
                <div className="container d-flex justify-content-between align-items-center">
                    <h1>Welcome</h1>
                </div>
            </header>
            <div className="container-fluid m-0 pt-2">
                <div className="row">
                    <aside className="col-md-3 bg-dark text-white p-3 min-vh-100 position-fixed" style={{ left: 0 }}>
                        <nav>
                            <ul className="list-unstyled">
                                <li className="mb-3 mt-3">
                                    <Link to="/" className="text-white d-flex align-items-center text-black">
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
                    <main className="col-md-9 ms-sm-auto p-3" style={{ marginLeft: '20%' }}>
                        <div className="mb-4">
                            <h2>Add Course</h2>
                            <form onSubmit={handleSubmitCourse} className="bg-white p-5 shadow-sm rounded">
                                <div className="mb-3">
                                    <label htmlFor="course_name" className="form-label">Course Name</label>
                                    <input
                                        type="text"
                                        id="course_name"
                                        className="form-control"
                                        placeholder="Course Name"
                                        value={formData.course_name}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="course_title" className="form-label">Course Title</label>
                                    <input
                                        type="text"
                                        id="course_title"
                                        className="form-control"
                                        placeholder="Course Title"
                                        value={formData.course_title}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="course_description" className="form-label">Description</label>
                                    <input
                                        type="text"
                                        id="course_description"
                                        className="form-control"
                                        placeholder="Course Description"
                                        value={formData.course_description}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="course_image" className="form-label">Course Image</label>
                                    <input
                                        type="file"
                                        id="course_image"
                                        className="form-control"
                                        onChange={handleFileInput}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="course_logo" className="form-label">Course Logo</label>
                                    <input
                                        type="file"
                                        id="course_logo"
                                        className="form-control"
                                        onChange={handleFileInput}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="course_pdf" className="form-label">Course pdf</label>
                                    <input
                                        type="file"
                                        id="course_pdf"
                                        className="form-control"
                                        onChange={handleFileInput}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="course_contents" className="form-label">Course Contents</label>
                                    <textarea
                                        id="course_contents"
                                        className="form-control"
                                        placeholder="Course Contents"
                                        value={formData.course_contents}
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark" disabled={loading}>
                                    {loading ? "Adding..." : "Add Course"}
                                </button>
                                {error && <p className="text-danger mt-3">{error}</p>}
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default AddCourse;
