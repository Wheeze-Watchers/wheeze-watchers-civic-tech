import { useNavigate, NavLink } from "react-router-dom";
import heroImage from "../assets/hero-image.svg";
import sectionImage from "../assets/dude_shrugging.svg";
import sectionImage2 from "../assets/people-reading-books.svg";

export default function HomePage() {
  return (
    <>
      <section className="hero is-medium mb-1" id="hero">
        <h1 className="title is-1 has-text-dark is-spaced mt-6 ml-6 mr-6 mb-0">
          Community, Connections & Change.
        </h1>
        <div className="columns">
          <div className="column">
            <div className="title is-2 has-text-dark is-large mb-2 ml-6 mr-4 mt-6">
              Struggling with Asthma?
            </div>
            <div className="subtitle is-3 mb-6 ml-6 mr-4 mt-2">
              Contact healthcare experts in our forum base app with <strong>EAZE</strong>. Ask
              any asthma-related questions. Connect with other people dealing
              with asthma. You are not alone.
            </div>
            <div id="home-buttons-container" className="m-5 has-text-centered">
              <NavLink to="sign-up">
                <button
                  id="home-sign-in-button"
                  className="button is-rounded has-text-weight-semibold is-large is-responsive medium-blue-slate mx-2 my-2 has-text-white"
                >
                  Try Eaze
                </button>
              </NavLink>
              <NavLink to="login">
                <button className="button color-text is-rounded coloring is-large is-responsive mx-2 my-2 has-text-weight-semibold">
                  Already have an Account?
                </button>
              </NavLink>
            </div>
          </div>
          <div className="column" id="hero-image-div">
            <div className="image mb-1">
              <img
                src={heroImage}
                alt="Group of Friends Talking"
                id="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="columns is-vcentered">
          <div className="column">
            <div className="image">
              <img src={sectionImage} alt="Man Shrugging" id="section-image" />
            </div>
          </div>
          <div className="column">
            <div className="has-centered-text">
              <h2 className="title is-2 mb-2">Got Questions About Asthma?</h2>
              <h3 className="subtitle is-3">
                Ask all your asthma related questions, and speak all your asthma
                related thoughts on our discussions forum.
              </h3>
              <NavLink to="/discussion">
                <button className="button is-rounded is-large has-text-white medium-blue-slate has-text-weight-semibold">
                  Start Chatting
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section thisle">
        <div className="columns is-vcentered">
          <div className="column">
            <h2 className="title is-2 mb-2">Need Resources?</h2>
            <h3 className="subtitle is-3">
              Here are our expert provided resources selected just for you.
            </h3>
            <NavLink to="/resources">
              <button className="button is-rounded is-large medium-blue-slate has-text-white has-text-weight-semibold">
                Check Out Expert Resources
              </button>
            </NavLink>
          </div>
          <div className="column">
            <div className="image">
              <img
                src={sectionImage2}
                alt="People Reading Books"
                id="section-image-2"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="footer medium-blue-slate has-text-weight-semibold">
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
