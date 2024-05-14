import { useNavigate, NavLink } from "react-router-dom";
import "./Home.css";

export default function HomePage() {
  return (
    <div className="home-container">
      {/* Mission Statement */}
      <div>
        <h1>Connect</h1>
        <p className="mission-statement">
          EAZE is a forum for users in NYC suffering from asthma, parents of
          asthmatic children, and asthma healthcare professionals to interact
          with one another, provide vital resources in order to help better
          manage the effects of asthma.
        </p>
      </div>
      <div className="">
        <h2>Latest Article</h2>
        <NavLink to="/resources">Resources</NavLink>
      </div>
      <div className="">
        <h2>Discussion Board</h2>
        <NavLink to="/discussion">Discussions</NavLink>
      </div>
      <footer></footer>
    </div>
  );
}
