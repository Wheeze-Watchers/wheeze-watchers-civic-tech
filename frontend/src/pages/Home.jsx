import { useNavigate, NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <section className="hero is-info is-medium">
        <div className="hero-body">
          <p className="title has-text-light">
            Community, Connections & Change.
          </p>
          <p className="subtitle has-text-light">
            <strong className="has-text-light">EAZE</strong> is a forum for
            users in NYC suffering from asthma, parents of asthmatic children,
            and asthma healthcare professionals to interact with one another,
            provide vital resources in order to help better manage the effects
            of asthma.
          </p>
        </div>
      </section>
      <section className="section" id="resources-home-card">
        <NavLink to="/resources">
          <div className="title">
            <h2>Resource Page</h2>
          </div>
        </NavLink>
      </section>
      <section className="section" id="discussion-home-card">
        <NavLink to="/discussion">
          <div className="title">
            <h2>Discussion Board</h2>
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
