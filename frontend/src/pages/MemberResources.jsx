import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import Microlink from '@microlink/react'

export default function () {
    const { currentUser } = useContext(CurrentUserContext)
    console.log(currentUser)
    // if (currentUser.expert === true) {
    //     console.log(currentUser)
    //    return <Button>Add</Button>
    // }
    return (
        <>
        <div className="topic-container">
            <h1>Member Resources</h1>
        </div>


        <div className="info-box-container">
            <div className="info-box">
                <Microlink url="https://www.uchicagomedicine.org/forefront/pediatrics-articles/2024/january/improving-asthma-outcomes-and-reducing-health-disparities"/>
            </div>

            <div className="info-box">
                <Microlink url="https://www.medicalnewstoday.com/articles/running-with-asthma"/>
            </div>

            <div className="info-box">
                <Microlink url="https://www.who.int/news-room/fact-sheets/detail/asthma"/>
            </div>
        </div>
        <footer>
            random stuff in the footer
        </footer>
        
        </>
  );
}