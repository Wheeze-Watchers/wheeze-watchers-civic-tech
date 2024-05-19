import { useNavigate, NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <section className="hero is-info is-medium">
        <div className="hero-body">
          <h2 className="title is-2 has-text-light is-spaced">
            Community, Connections & Change.
          </h2>
          <p className="subtitle is-4 has-text-light is-large">
            EAZE is a forum for users in NYC suffering from asthma, parents of
            asthmatic children, and asthma healthcare professionals to interact
            with one another, provide vital resources in order to help better
            manage the effects of asthma.
          </p>
        </div>
      </section>
      <section className="section is-medium" id="resources-home-card">
        <NavLink to="/resources">
          <div className="title">
            <h2>Resource Page</h2>
          </div>
          <div className="subtitle">
            <h2>Connect with others with the same struggle here</h2>
          </div>
        </NavLink>
      </section>
      <section className="section is-medium" id="discussion-home-card">
        <NavLink to="/discussion">
          <div className="title">
            <h2>Discussion Board</h2>
          </div>
          <div className="subtitle">
            <h2>Connect with others with the same struggle here</h2>
          </div>
        </NavLink>
      </section>
      <section className></section>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>EAZE</strong> was developed by Aaron Castillo, Dominic Tuzo
            & Maya Ramkishun.
          </p>
        </div>
      </footer>
    </>
  );
}
