import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHandler } from "../utils";

export default function () {
    return (
        <>
        <div className="topic-container">
            <h1>Member Resources</h1>
        </div>

        <div className="info-box-container">
            <div className="info-box">
                <h3><a href="https://www.uchicagomedicine.org/forefront/pediatrics-articles/2024/january/improving-asthma-outcomes-and-reducing-health-disparities">Link to article</a> </h3>
                <img src="../../dummyImg.png" alt="" />
                <p>Blah blah blah...</p>
            </div>

            <div className="info-box">
                <h3><a href="https://www.medicalnewstoday.com/articles/running-with-asthma">Link to article</a> </h3>
                <img src="../../dummyImg.png" alt="" />
                <p>Blah blah blah...</p>
            </div>

            <div className="info-box">
                <h3><a href="https://www.who.int/news-room/fact-sheets/detail/asthma">Link to article</a> </h3>
                <img src="../../dummyImg.png" alt="" />
                <p>Blah blah blah...</p>
            </div>
        </div>
        <footer>
            random stuff in the footer
        </footer>
        
        </>
  );
}