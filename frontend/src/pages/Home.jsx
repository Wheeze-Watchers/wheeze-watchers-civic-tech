import { useNavigate, NavLink } from "react-router-dom";
import heroImage from "../assets/hero-image.svg";
import sectionImage from "../assets/dude_shrugging.svg";

export default function HomePage() {
  return (
    <>
      <section className="hero is-medium" id="hero">
        <h2 className="title is-1 has-text-dark is-spaced mt-6 ml-6 mr-6 mb-0">
          Community, Connections & Change.
        </h2>
        <div className="columns">
          <div className="column">
            <div className="subtitle is-3 has-text-dark is-large block mb-6 ml-6 mr-4 mt-6">
              <strong>Struggling with asthma?</strong> Contact healthcare
              experts in our forum base app with Eaze. Ask any asthma-related
              questions. Connect with other people dealing with asthma. You are
              not alone.
            </div>
            <div id="home-buttons-container" className="m-6 has-text-centered">
              <NavLink to="sign-up">
                <button
                  id="home-sign-in-button"
                  className="button is-rounded has-text-light is-large is-responsive medium-blue-slate "
                >
                  Try Eaze
                </button>
              </NavLink>
              <NavLink to="login">
                <button className="button is-rounded is-large is-responsive">
                  Already have an Account?
                </button>
              </NavLink>
            </div>
          </div>
          <div className="column" id="hero-image-div">
            <img
              src={heroImage}
              alt="Group of Friends Talking"
              id="hero-image"
            />
          </div>
        </div>
      </section>

      <section className="section is-medium white">
        <div className="columns">
          <div className="column">
            <img src={sectionImage} alt="Man Shrugging" id="section-image" />
          </div>
          <div className="column">
            <div className="title is-2 mb-2">Got Questions About Asthma?</div>
            <div className="subtitle is-3">
              Ask all your asthma related questions, and speak all your asthma
              related thoughts on our discussions forum.
            </div>
            <NavLink to="discussion">
              <button className="button is-rounded is-large has-text-white medium-blue-slate">
                Start Chatting
              </button>
            </NavLink>
          </div>
        </div>
      </section>

      <section className="section is-medium thisle" id="resources-home-card">
        <NavLink to="/resources">
          <div className="title">
            <h2>Resource Page</h2>
          </div>
          <div className="subtitle">
            <h2>Connect with others with the same struggle here</h2>
          </div>
        </NavLink>
      </section>
      <section className="section is-medium champagne-pink">
        <NavLink to="/discussion">
          <div className="title">
            <h2>Discussion Board</h2>
          </div>
          <div className="subtitle">
            <h2>Connect with others with the same struggle here</h2>
          </div>
        </NavLink>
      </section>
      <footer className="footer medium-blue-slate">
        <div className="content has-text-centered">
          <div className="block has-text-light">
            <strong className="has-text-light">EAZE</strong> was developed by
            Aaron Castillo, Dominic Tuzo & Maya Ramkishun.
          </div>
        </div>
      </footer>
    </>
  );
}
