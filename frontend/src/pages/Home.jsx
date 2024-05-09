import { useNavigate, NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      {/* Mission Statement */}
      <div>
        <h1>
          Wheeze Watchers is a forum for users in NYC suffering from asthma,
          parents of asthmatic children, and asthma healthcare professionals to
          interact with one another, provide vital resources in order to help
          better manage the effects of asthma.
        </h1>
      </div>
      <div>
        <h2>Resource Page</h2>
        <NavLink to="/">Resources</NavLink>
      </div>
      <div>
        <h2>Discussion Board</h2>
      </div>
    </>
  );
}
