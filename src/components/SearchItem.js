import React, { useState } from "react";
import XMLParser from 'react-xml-parser';

export default function SearchItem(props) {
    const [url, setUrl] = useState("");
    const [players, setPlayers] = useState("");
    const [age, setAge] = useState("");
    const [playTime, setPlayTime] = useState("");
    const [year, setYear] = useState("");
    const [isLike, setLike] = useState(props.fav);

    function fetchDetails() {
        fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${props.id}`)
            .then(res => res.text())
            .then(dat => {
                var xml = new XMLParser().parseFromString(dat);
                var attributes = xml.children[0].children;
                var minPlayers = 0;
                var maxPlayers = 0;

                attributes.forEach(function(attr) {
                    var name = attr.name;
                    switch (name) {
                        case "thumbnail":
                            attr.value ? setUrl(attr.value) : setUrl("");
                            break;
                        case "minage":
                            setAge(attr.attributes.value);
                            break;
                        case "yearpublished":
                            setYear(attr.attributes.value);
                            break;
                        case "minplayers":
                            minPlayers = attr.attributes.value;
                            break;
                        case "maxplayers":
                            maxPlayers = attr.attributes.value;
                            break;
                        case "playingtime":
                            setPlayTime(attr.attributes.value + " mins");
                            break;
                        default:
                            break;
                    }
                });

                if (minPlayers === maxPlayers) {
                    setPlayers(minPlayers);
                } else {
                    setPlayers(minPlayers + " - " + maxPlayers);
                }
            })
    }
    fetchDetails();

    function handleClick() {
        if (!isLike) {
            props.addFav(props.id, props.name, url, players, age, playTime, year);
        } else {
            props.removeFav(props.id);
        }
        setLike(!isLike);
    }

    return (
        <div className="searchItems" key={props.id}>
            <h4>{props.name}</h4>
            <p>
                Year published: {year} <br />
                No. of players: {players} <br />
                Minimum age: {age} <br />
                Playing time: {playTime}
            </p>
            {url ? <img src={url} alt="board game" /> : ""}
            <i
                className="fa fa-heart"
                style={{ color: isLike ? 'pink' : 'grey' }}
                onClick={handleClick}
            >
            </i>
        </div>
    );
}