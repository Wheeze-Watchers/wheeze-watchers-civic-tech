import { useContext } from "react";
import { Form, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import Microlink from '@microlink/react'

export default function () {
    const { currentUser } = useContext(CurrentUserContext)
    const currentUserDummy = {
      first_name: "bob",
      last_name: "dylan",
      email: "bobdylan@mail.com",
      username: "john_doe",
      expert: true,
    }
    const onClick = () => {
        // code for pop up
        console.log('function works')
        
    }
    // console.log(currentUser)
    return (
        <>
        <div className="topic-container">
            <h1>Member Resources</h1>
        </div>

        {currentUserDummy.expert &&<div id='resource'>
            <button onClick={onClick}>Add Resource</button>
         </div>
         }

        <div className="info-box-container">
            <div className="info-box">
                <Microlink id="article-header" url="https://www.uchicagomedicine.org/forefront/pediatrics-articles/2024/january/improving-asthma-outcomes-and-reducing-health-disparities"/>
            </div>

            <div className="info-box">
                <Microlink id="article-header" url="https://www.medicalnewstoday.com/articles/running-with-asthma"/>
            </div>

            <div className="info-box">
                <Microlink id="article-header" url="https://www.who.int/news-room/fact-sheets/detail/asthma"/>
            </div>
        </div>
        <footer>
            random stuff in the footer
        </footer>
        
        </>
  );
}