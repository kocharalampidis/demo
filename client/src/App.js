import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
	const [movieName, setMovieName] = useState("");
	const [movieReview, setReview] = useState("");
	const [movieReviewList, setMovieList] = useState([]);

	const [newReview, setNewReview] = useState("");
	useEffect(() => {
		Axios.get("http://localhost:3001/api/get").then((response) => {
			setMovieList(response.data);
		});
	}, []);

	const submitReview = () => {
		Axios.post("http://localhost:3001/api/insert", {
			movieName: movieName,
			movieReview: movieReview,
		});

		setMovieList([
			...movieReviewList,
			{ movieName: movieName, movieReview: movieReview },
		]);
	};

	const deleteReview = (movie) => {
		Axios.delete(`http://localhost:3001/api/delete/${movie}`);
	};

	const updateReview = (movie) => {
		Axios.put("http://localhost:3001/api/update", {
			movieName: movie,
			movieReview: newReview,
		});
		setNewReview("");
	};

	return (
		<>
			<div className='App'>
				<div>
					<label> Movie Name: </label>
					<input
						type='text'
						name='movieName'
						onChange={(e) => {
							setMovieName(e.target.value);
						}}></input>
				</div>
				<div>
					<label>Review: </label>
					<input
						type='text'
						name='movieName'
						onChange={(e) => {
							setReview(e.target.value);
						}}></input>
				</div>
				<div>
					<button onClick={submitReview}> Submit </button>
				</div>

				{movieReviewList.map((val) => (
					<ul>
						<li className='App' key={val.id}>
							<input
								id='updateInput'
								onClick={(e) => {
									setNewReview(e.target.value);
								}}></input>
							<button
								onClick={(e) => {
									updateReview(val.name);
								}}>
								up
							</button>
							{val.id}
							<button
								onClick={() => {
									deleteReview(val.name);
								}}>
								{" "}
								del{" "}
							</button>
						</li>
						<li key={val.id}>MovieName:{val.name}</li>
					</ul>
				))}
			</div>
		</>
	);
}

export default App;

// {movieReviewList.map((val) => {
// 	return (
// 		<h1>
// 			{" "}
// 			MovieName: {val.movieName} || movieReview: {val.movieReview}
// 		</h1>
// 	);
// })}
