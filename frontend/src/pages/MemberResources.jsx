import { useContext, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/current-user-context';
import Microlink from '@microlink/react';

export default function () {
	const { currentUser } = useContext(CurrentUserContext);
	const currentUserDummy = {
		first_name: 'bob',
		last_name: 'dylan',
		email: 'bobdylan@mail.com',
		username: 'john_doe',
		expert: true,
	};
	const [isActive, setIsActive] = useState(false);

	const toggleModal = () => {
		setIsActive(!isActive);
	};

	const handleSubmit = (e) => {
	    e.preventDefault();
	    <Microlink url={e} />
        console.log('handleSubmit')
	};

	return (
		<>
			<div className="topic-container">
				<h1>Member Resources</h1>
			</div>

			{currentUserDummy.expert && (
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
                                    <input type="text" id="resource-link" name="resource-link" />
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
				<div className="info-box">
					<Microlink
						id="article-header"
						url="https://www.uchicagomedicine.org/forefront/pediatrics-articles/2024/january/improving-asthma-outcomes-and-reducing-health-disparities"
					/>
				</div>

				<div className="info-box">
					<Microlink
						id="article-header"
						url="https://www.medicalnewstoday.com/articles/running-with-asthma"
					/>
				</div>

				<div className="info-box">
					<Microlink
						id="article-header"
						url="https://www.who.int/news-room/fact-sheets/detail/asthma"
					/>
				</div>
			</div>
			<footer>random stuff in the footer</footer>
		</>
	);
}
