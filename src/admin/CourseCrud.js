import axios from "axios";
import { useEffect, useState } from "react";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { pdfjs } from 'react-pdf';

function CourseCrud() {
    const [crudDatas, setCurdData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3002/ViewCourse")
            .then((res) => {
                console.log(res.data);
                setCurdData(res.data);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    }, []);

    const handleDelete = (courseId) => {
        // Implement the delete functionality
        axios.delete(`http://localhost:3002/DeleteCourse/${courseId}`)
            .then((res) => {
                console.log(res.data);
                setCurdData(crudDatas.filter(course => course.course_id !== courseId));
            })
            .catch((error) => {
                console.log("Error deleting course:", error);
            });
    };

    const handleView = (courseId) => {
        // Implement the view functionality
        console.log(`Viewing course with ID: ${courseId}`);
    };

    const handleUpdate = (courseId) => {
        // Implement the update functionality
        console.log(`Updating course with ID: ${courseId}`);
    };

    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>course_id</th>
                            <th>course_name</th>
                            <th>course_title</th>
                            <th>course_description</th>
                            <th>course_image</th>
                            <th>course_logo</th>
                            <th>course_pdf</th>
                            <th>View Action</th>
                            <th>Delete Action</th>
                            <th>Update Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crudDatas.map((crudData) => (
                            <tr key={crudData.course_id}>
                                <td>{crudData.course_id}</td>
                                <td>{crudData.course_name}</td>
                                <td>{crudData.course_title}</td>
                                <td>{crudData.course_description}</td>
                                <td>
                                    {crudData.course_image && (
                                        <img src={`http://localhost:3002/images/${crudData.course_image}`} alt="Course" style={{ width: '50px' }} />
                                    )}
                                </td>
                                <td>
                                    {crudData.course_logo && (
                                        <img src={`http://localhost:3002/images/${crudData.course_logo}`} alt="Logo" style={{ width: '50px' }} />
                                    )}
                                </td>
                                <td>
                                     {crudData.course_pdf && (
                <div style={{ height: '600px', width: '100%' }}>
                    <Worker WorkerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={`http://localhost:3002/pdfs/${crudData.course_pdf}`} />
                    </Worker>
                </div>
            )}
                                </td>
                                <td>
                                    <button onClick={() => handleView(crudData.course_id)}>View</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(crudData.course_id)}>Delete</button>
                                </td>
                                <td>
                                    <button onClick={() => handleUpdate(crudData.course_id)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default CourseCrud;
