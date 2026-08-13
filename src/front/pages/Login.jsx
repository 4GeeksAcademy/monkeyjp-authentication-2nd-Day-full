import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService.js";

export const Login = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		setError("");

		const { ok, data } = await login(email, password);

		if (!ok) {
			setError(data.msg);
			return;
		}

		localStorage.setItem("token", data.token);

		dispatch({
			type: "LOGIN",
			payload: data.token
		});

		navigate("/profile");
	};


	return (
		<div className="container">
			<div className="row justify-content-center align-items-center min-vh-100">
				<div className="col-12 col-sm-10 col-md-7 col-lg-5">
					<div className="card shadow border-0">
						<div className="card-body p-4 p-md-5">

							<div className="text-center mb-4">
								<h1 className="h3 fw-bold">
									Welcome back
								</h1>

								<p className="text-muted mb-0">
									Sign in to continue to your account
								</p>
							</div>

							{error && (
								<div
									className="alert alert-danger"
									role="alert"
								>
									{error}
								</div>
							)}

							<form onSubmit={handleSubmit}>

								<div className="mb-3">
									<label
										htmlFor="email"
										className="form-label"
									>
										Email
									</label>

									<input
										type="email"
										id="email"
										className="form-control"
										placeholder="name@example.com"
										value={email}
										onChange={(event) =>
											setEmail(event.target.value)
										}
										required
									/>
								</div>

								<div className="mb-4">
									<label
										htmlFor="password"
										className="form-label"
									>
										Password
									</label>

									<input
										type="password"
										id="password"
										className="form-control"
										placeholder="Enter your password"
										value={password}
										onChange={(event) =>
											setPassword(event.target.value)
										}
										required
									/>
								</div>

								<button
									type="submit"
									className="btn btn-primary w-100"
								>
									Sign In
								</button>
							</form>

							<hr className="my-4" />

							<p className="text-center text-muted mb-0">
								Don't have an account?{" "}
								<Link
									to="/signup"
									className="text-decoration-none fw-semibold"
								>
									Create one
								</Link>
							</p>

						</div>
					</div>
				</div>
			</div>
		</div>
	);
}; 