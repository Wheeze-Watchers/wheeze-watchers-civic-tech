import { useContext, useState, useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/current-user-context';
import Microlink from '@microlink/react';
import { fetchHandler, getPostOptions } from '../utils';

export default function () {
	const { currentUser } = useContext(CurrentUserContext);
	const [newUrl, setNewUrl] = useState('')
	const [resource, setResource] = useState([])
	const currentUserDummy = {
		id: 7,
		first_name: 'bob',
		last_name: 'dylan',
		email: 'bobdylan@mail.com',
		username: 'john_doe',
		expert: true,
	};

	useEffect(() => {
		const fetchResources = async () => {
			const response = await fetchHandler('/api/resources/');
			const validResources = response.filter(resource => resource !== null && resource !== undefined);
			setResource(validResources[0]);
		};
		fetchResources()
	}, [])

	const [isActive, setIsActive] = useState(false);

	const toggleModal = () => {
		setIsActive(!isActive);
	};

	const handleSubmit = async (e) => {
	    e.preventDefault();
	    if (currentUserDummy) {
			const response = await fetchHandler('/api/resources/', getPostOptions({ user_id: currentUserDummy.id, url: newUrl }));
			if (!response.ok) {
                throw new Error("Network response was not ok");
            }
		}
	};

	return (
		<>
			<div className="topic-container">
				<h1>Member Resources</h1>
			</div>

			{currentUserDummy.expert && (
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

			<div className='info-box-container'>
				{resource && resource.map((val) => (
					<div className='info-box' key={val.id}>
						{val.url && typeof val.url === 'string' && (
							<Microlink
								id={val.id}
								url={val.url}
							/>
						)}
					</div>
				))}
			</div>

					<div className={`modal ${isActive ? 'is-active' : ''}`}>
						<div className="modal-background"></div>
						<div className="modal-content">
							<div className="box">
								<form onSubmit={handleSubmit} aria-labelledby="resource-form">
                                    <label htmlFor="comment">Add Link Below:</label>
                                    <input type="text" id="resource-link" name="resource-link" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
                                    <button>Add</button>
                                </form>
							</div>
						</div>
						<button
							className="modal-close is-large"
							aria-label="close"
							onClick={toggleModal}
						></button>
					</div>
			<footer>random stuff in the footer</footer>
		</>
	);
}
