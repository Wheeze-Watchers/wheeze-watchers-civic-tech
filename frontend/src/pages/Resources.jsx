import { useContext, useState, useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/current-user-context';
import Microlink from '@microlink/react';
import { fetchHandler, getPostOptions } from '../utils';

export default function () {
	const { currentUser } = useContext(CurrentUserContext);
	const [newUrl, setNewUrl] = useState('')
	const [resource, setResource] = useState([])
	const [toggle, setToggle] = useState(true);
	const [renderToggle, setRenderToggle] = useState(0);
	const [usedUrl, setUsedUrl] = useState(new Set());
	useEffect(() => {
		const fetchResources = async () => {
			const response = await fetchHandler('/api/resources/');
			const validResources = response.filter(resource => resource !== null && resource !== undefined);
			console.log(validResources[0])
			const urls = validResources[0].map(resource => resource.url);
			const uniqueUrls = new Set(urls);
			setUsedUrl(uniqueUrls);
			
			setResource(validResources[0]);		
			
		};
		fetchResources()
	}, [toggle, renderToggle])

	
	const [isActive, setIsActive] = useState(false);

	const toggleModal = () => {
		setIsActive(!isActive);
	};

	const handleSubmit = async (e) => {
	    e.preventDefault();
		// console.log(usedUrl)
		// console.log(usedUrl.has(newUrl))
		toggleModal()
	    if (currentUser && !usedUrl.has(newUrl)) {
			
			const response = await fetchHandler('/api/resources/', getPostOptions({ user_id: currentUser.id, url: newUrl }));
			if (response[0] === null) {
                throw new Error("Network response was not ok");
            }
			setRenderToggle(renderToggle + 1)
			
			
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
		  // ???
		  setResource(resource.filter((resource) => resource.id !== id));
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
			<h1 className="title is-1 has-text-weight-bold has-text-centered my-5">
				Resources
			</h1>

			{currentUser && currentUser.expert && (
				<>
					<div className="buttons is-centered">
						<button
							className="button medium-blue-slate has-text-white has-text-weight-semibold"
							onClick={toggleModal}
						>
							Add Link
						</button>
					</div>
					
				</>
			)}

			<div className="columns is-multiline">
			{resource && resource.map((val) => (
				<div className="column is-half is-flex is-justify-content-center is-align-items-center" key={val.id}>
					<div className="box" style={{"width": 540}} >
						<div className="content has-text-centered">
							{val.url && typeof val.url === 'string' && (
							<Microlink id={val.id} url={val.url} />
							)}
						</div>
						{currentUser && currentUser.expert && 
						<button
							type="button"
							className="button is-danger has-text-weight-semibold"
							onClick={() => handleDelete(val.id)}
						>
							Delete
						</button>}
					</div>
				</div>
			))}
			</div>

			<div className={`modal ${isActive ? 'is-active' : ''}`}>
				<div className="modal-background"></div>
				<div className="modal-content">
					<div className="box">
						<form aria-labelledby="resource-form">
							<label htmlFor="resource">Add Link Below:</label>
							<input type="text" id="resource-link" name="resource-link" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
							<button className="button is-info" onClick={handleSubmit}>Add</button>
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
