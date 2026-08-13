import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";

export const Profile = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPrivateInformation = async () => {
            const { ok, data } = await getProfile(store.token);

            if (!ok) {
                localStorage.removeItem("token");

                dispatch({
                    type: "LOGOUT"
                });

                navigate("/404");
                return;
            }

            dispatch({
                type: "SET_USER",
                payload: data
            });

            setLoading(false);
        };

        getPrivateInformation();
    }, []);

    const signOut = () => {
        localStorage.removeItem("token");

        dispatch({
            type: "LOGOUT"
        });

        navigate("/");
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow border-0">
                        <img
                            src="https://static.wixstatic.com/media/1061d9_aa94cd19e56b4ff1b333a448cb4affcd~mv2.jpg/v1/fill/w_602,h_364,al_c,lg_1,q_80/1061d9_aa94cd19e56b4ff1b333a448cb4affcd~mv2.jpg"
                            className="card-img-top"
                            alt="Private area"
                        />

                        <div className="card-body text-center p-4">
                            <h2 className="h4 fw-bold mb-3">
                                Welcome to your profile
                            </h2>

                            <p className="text-muted">
                                You are authenticated and your token is valid.
                            </p>

                            <div className="bg-light rounded p-3 mb-4">
                                <p className="mb-1">
                                    <strong>User ID:</strong> {store.user?.id}
                                </p>

                                <p className="mb-0">
                                    <strong>Email:</strong> {store.user?.email}
                                </p>
                            </div>

                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={signOut}
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};