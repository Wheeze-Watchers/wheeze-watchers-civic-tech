import { useNavigate, NavLink } from "react-router-dom";
import "./Home.css";

export default function HomePage() {
  return (
    <div className="home-container">
      <div>
        <h1>Community, Connections & Change.</h1>
        <h2 className="mission-statement">
          EAZE is a forum for users in NYC suffering from asthma, parents of
          asthmatic children, and asthma healthcare professionals to interact
          with one another, provide vital resources in order to help better
          manage the effects of asthma.
        </h2>
      </div>
      <div className="home-card">
        <NavLink to="/resources">
          <h2>Resource Page</h2>
        </NavLink>
      </div>
      <div className="home-card">
        <NavLink to="/discussion">
          <h2>Discussion Board</h2>
        </NavLink>
      </div>
      <footer></footer>
    </div>
  );
}
