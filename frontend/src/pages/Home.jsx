import { useNavigate, NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-container">
      <div id="mission-statement">
        <h1>Community, Connections & Change.</h1>
        <div id="description">
          <h2>
            EAZE is a forum for users in NYC suffering from asthma, parents of
            asthmatic children, and asthma healthcare professionals to interact
            with one another, provide vital resources in order to help better
            manage the effects of asthma.
          </h2>
        </div>
      </div>
      <div className="info-box-container">
        <div className="info-box">
          <NavLink to="/resources">
            <h2>Resource Page</h2>
          </NavLink>
        </div>
        <div className="info-box">
          <NavLink to="/discussion">
            <h2>Discussion Board</h2>
          </NavLink>
        </div>
      </div>
      <footer></footer>
    </div>
  );
}
