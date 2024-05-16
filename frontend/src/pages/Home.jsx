import { useNavigate, NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <section class="hero is-info ">
        <div class="hero-body">
          <p class="title">Community, Connections & Change.</p>
          <p class="subtitle">
            EAZE is a forum for users in NYC suffering from asthma, parents of
            asthmatic children, and asthma healthcare professionals to interact
            with one another, provide vital resources in order to help better
            manage the effects of asthma.
          </p>
        </div>
      </section>
      <section class="section" id="resources-home-card">
        <NavLink to="/resources">
          <div class="title">
            <h2>Resource Page</h2>
          </div>
        </NavLink>
      </section>
      <section class="section" id="discussion-home-card">
        <NavLink to="/discussion">
          <div class="title">
            <h2>Discussion Board</h2>
          </div>
        </NavLink>
      </section>
      <section class></section>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>EAZE</strong> was developed by Aaron Castillo, Dominic Tuzo
            & Maya Ramkishun.
          </p>
        </div>
      </footer>
    </>
  );
}
