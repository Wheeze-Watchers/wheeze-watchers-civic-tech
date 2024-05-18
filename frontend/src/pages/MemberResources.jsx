import { useContext, useState, useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/current-user-context';
import Microlink from '@microlink/react';
import { fetchHandler } from '../utils';

export default function () {
	const { currentUser } = useContext(CurrentUserContext);
	const [url, setUrl] = useState('')
	const [resource, setResource] = useState([])
	const currentUserDummy = {
		first_name: 'bob',
		last_name: 'dylan',
		email: 'bobdylan@mail.com',
		username: 'john_doe',
		expert: true,
	};

	useEffect(() => {
		const fetchResources = async() => {
			const response = await fetchHandler('/api/resources/')
			// setResource(response)
			console.log(response)
		}
		fetchResources()
	}, [])

	const [isActive, setIsActive] = useState(false);

	const toggleModal = () => {
		setIsActive(!isActive);
	};

	const handleSubmit = (e) => {
	    e.preventDefault();
	    <Microlink url={url} />
        console.log(url)
	};

	return (
		<>
			<div className="topic-container">
				<h1>Member Resources</h1>
			</div>

			{currentUserDummy.expert && ( // changed currentUserDummy to currentUser
				<div className="columns is-centered">
					<div className="column is-half">
						<button
							className="button is-info"
							onClick={toggleModal}
						>
							Add Link
						</button>
					</div>
					<div className={`modal ${isActive ? 'is-active' : ''}`}>
						<div className="modal-background"></div>
						<div className="modal-content">
							<div className="box">
								<p>This is the content of the modal.</p>
								<form onSubmit={handleSubmit} aria-labelledby="resource-form">
                                    <label htmlFor="comment">Add Link Below:</label>
                                    <input type="text" id="resource-link" name="resource-link" value={url} onChange={(e) => setUrl(e.target.value)} />
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
				</div>
			)}

			<div className="info-box-container">
				
			</div>
			<footer>random stuff in the footer</footer>
		</>
	);
}
