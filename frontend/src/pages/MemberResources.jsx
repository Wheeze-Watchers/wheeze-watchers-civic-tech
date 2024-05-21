import { useContext, useState, useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/current-user-context';
import Microlink from '@microlink/react';
import { fetchHandler, getPostOptions } from '../utils';

export default function () {
	const { currentUser } = useContext(CurrentUserContext);
	const [newUrl, setNewUrl] = useState('')
	const [resource, setResource] = useState([])
	const [toggle, setToggle] = useState(true)
	useEffect(() => {
		const fetchResources = async () => {
			const response = await fetchHandler('/api/resources/');
			const validResources = response.filter(resource => resource !== null && resource !== undefined);
			setResource(validResources[0]);
		};
		fetchResources()
	}, [toggle])

	const [isActive, setIsActive] = useState(false);

	const toggleModal = () => {
		setIsActive(!isActive);
	};

	const handleSubmit = async (e) => {
	    e.preventDefault();
	    if (currentUser) {
			const response = await fetchHandler('/api/resources/', getPostOptions({ user_id: currentUser.id, url: newUrl }));
			if (!response.ok) {
                throw new Error("Network response was not ok");
            }
			// setResource(...resource, response)
			toggleModal()
		}
	};

	const handleDelete = async (id) => {
		try {
		  const response = await fetch(`/api/resources/${id}`, {
			method: "DELETE",
		  });
		  if (!response.ok) {
			throw new Error("Network response was not ok");
		  }
		  setResource(resource.filter((post) => resource.id !== id));
		} catch (error) {
		  console.error(
			"There has been a problem with your fetch operation:",
			error
		  );
		}
		setToggle(!toggle)
	  };

	return (
		<>
			<div className="title is-1 has-text-centered mx-*-1 my-*-1 px-*-1 py-*-1">
				<h1>Member Resources</h1>
			</div>

			{currentUser && currentUser.expert && (
				<>
				<div className="columns is-centered">
					<div className="column is-half">
						<button
							className="button is-info"
							onClick={toggleModal}
						>
							Add Link
						</button>
					</div>
				</div>
				</>
			)}

			<div className="columns is-multiline">
			{resource && resource.map((val) => (
				<div className="column is-half" key={val.id}>
					<div className="box">
						<div className="content has-text-centered">
							{val.url && typeof val.url === 'string' && (
							<Microlink id={val.id} url={val.url} />
							)}
						</div>
						<button
							type="button"
							className="button is-danger"
							onClick={() => handleDelete(val.id)}
						>
							Delete
						</button>
					</div>
				</div>
			))}
			</div>

					<div className={`modal ${isActive ? 'is-active' : ''}`}>
						<div className="modal-background"></div>
						<div className="modal-content">
							<div className="box">
								<form onSubmit={handleSubmit} aria-labelledby="resource-form">
                                    <label htmlFor="resource">Add Link Below:</label>
                                    <input type="text" id="resource-link" name="resource-link" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
                                    <button className="button is-info">Add</button>
                                </form>
							</div>
						</div>
						<button
							className="modal-close is-large"
							aria-label="close"
							onClick={toggleModal}
						></button>
					</div>
		</>
	);
}
