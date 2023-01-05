import React, { useState } from "react";

export default function SearchItem(props) {
    const [url, setUrl] = useState("");
    const [players, setPlayers] = useState("");
    const [age, setAge] = useState("");
    const [playTime, setPlayTime] = useState("");
    const [year, setYear] = useState("");
    const [isLike, setLike] = useState(props.fav);

    function fetchDetails() {
        fetch(`https://api.factmaven.com/xml-to-json/?xml=` +
            `https://boardgamegeek.com/xmlapi2/thing?id=${props.id}`)
            .then(res => res.text())
            .then(dat => {
                const boardGame = JSON.parse(dat).items.item;
                boardGame.thumbnail ? setUrl(boardGame.thumbnail) : setUrl("");
                setAge(boardGame.minage.value);
                setYear(boardGame.yearpublished.value);
                if (boardGame.minplayers.value === boardGame.maxplayers.value) {
                    setPlayers(boardGame.minplayers.value);
                } else {
                    setPlayers(boardGame.minplayers.value + " - " + boardGame.maxplayers.value);
                }
                if (boardGame.minplaytime.value === boardGame.maxplaytime.value) {
                    setPlayTime(boardGame.minplaytime.value + " mins");
                } else {
                    setPlayTime(boardGame.minplaytime.value + " - " + boardGame.maxplaytime.value + " mins");
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