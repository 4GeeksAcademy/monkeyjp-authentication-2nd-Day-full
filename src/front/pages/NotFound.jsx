import { Link, useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="container">
            <div className="card mb-3">
                <img src="https://i.kym-cdn.com/entries/icons/original/000/002/144/You_Shall_Not_Pass!_0-1_screenshot.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">You are not authorized to enter in the private page</h5>
                    <button type="submit" className="btn btn-primary" onClick={
                        () => {
                            navigate("/")
                        }
                    }>Try Again</button>
                </div>
            </div>
        </div>
    );
};