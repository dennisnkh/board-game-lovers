import React from "react";
import NavBar from "./NavBar";

export default function About() {
    return (
        <div>
            <h1>Board Game Lovers</h1>
            <NavBar />
            <p className="about">
                <u>Student</u><br />
                Ki Hin Ng<br /><br />
                <u>College</u><br />
                Langara College<br /><br />
                <u>Student ID</u><br />
                100378679<br /><br />
                <u>Course</u><br />
                CPSC2261<br /> <br />
                <u>Public API (Endpoints)</u><br />
                <a id="apilink" href="https://boardgamegeek.com/wiki/page/BGG_XML_API2">BGG XML API2</a>&nbsp;(/search, /hot, /thing)
                <br /><br />
                <u>Documentation</u><br />
                This is project built by React. <br />
                By consuming the BGG API, users can search for the board games they like. <br />
                They can save them to their favourite list and make notes.
                <br /><br />
                Search:<br />
                - By default, the hottest board games will be displayed<br />
                - Type in search bar to look for your interested item<br />
                - Click the heart button of each item to add to or remove from favourite list<br /><br />
                Favourite list:<br />
                - You can find your favourite board games here<br />
                - Use the filter bar to look for specific item<br />
                - Make notes on each item and click the save button to save them<br />
                - Click heart button to remove item from list<br />
                - Favourite list is stored in your browser<br /><br />
                <u>Sources</u><br />
                (Fonts)&nbsp;<a href="https://fonts.google.com/">Google Fonts</a><br />
                (Icons)&nbsp;<a href="https://fontawesome.com/">Font Awesome</a>
            </p>
        </div>
    );
}