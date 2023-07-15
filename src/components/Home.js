import React, { useEffect, useState } from "react";
import SearchItem from "./SearchItem";
import FavItem from "./FavItem";
import NavBar from './NavBar';
import XMLParser from 'react-xml-parser';

export default function Home() {

    const [name, setName] = useState('');
    const [items, setItems] = useState([]);
    const [favItems, setFav] = useState([]);
    const [showFav, setShowFav] = useState(false);
    const [search, setSearch] = useState("");

    function handleChange(e) {
        setName(e.target.value);
    }

    function toggleShowFav() {
        setShowFav(!showFav);
    }

    function toggleFav(id) {
        const updatedItems = items.map(item => {
            if (id === item.id) {
                return { ...item, fav: !item.fav }
            }
            return item;
        });
        setItems(updatedItems);
    }

    function addFav(id, name, url, players, age, playTime, year) {
        const newItem = {
            id: id,
            name: name,
            url: url,
            players: players,
            age: age,
            playTime: playTime,
            year: year,
            note: ""
        };
        setFav([...favItems, newItem]);
        toggleFav(id);
    }

    function removeFav(id) {
        const updateItems = favItems.filter(item => id !== item.id);
        setFav(updateItems);
        toggleFav(id);
    }

    function isFav(id) {
        let isFav = false;
        favItems.forEach((favItem) => {
            if (id === favItem.id) {
                isFav = true;
            }
        });
        return isFav;
    }

    const itemList = items.map((item) => (
        <SearchItem
            key={item.id}
            id={item.id}
            fav={isFav(item.id)}
            name={item.name}
            addFav={addFav}
            removeFav={removeFav}
        />
    ));

    const regex = new RegExp(search.trim(), "i");

    const favList = favItems
        .filter(item => search.trim() !== "" ? item.name.search(regex) > -1 : true)
        .map((item) => (
            <FavItem
                key={item.id}
                id={item.id}
                name={item.name}
                fav={true}
                url={item.url}
                players={item.players}
                age={item.age}
                playTime={item.playTime}
                year={item.year}
                note={item.note}
                favItems={favItems}
                addFav={addFav}
                removeFav={removeFav}
                setFav={setFav}
            />
        ));

    function handleSubmit(e) {
        e.preventDefault();
        const query = name.trim().replace(" ", "&");
        fetch(`https://boardgamegeek.com/xmlapi2/search?type=boardgame&query=${query}`)
            .then(response => response.text())
            .then(data => {
                var xml = new XMLParser().parseFromString(data);
                if (xml.attributes.total === '0') {
                    alert("No results found, Please try again.");
                }
                else {
                    const results = xml.children.slice(0, 10);
                    const searchList = results.map(result => (
                        {
                            id: result.attributes.id,
                            name: result.children[0].attributes.value
                        }
                    ));
                    setItems(searchList);
                }
            })
        setName("");
    }

    function filterName(e) {
        setSearch(e.target.value);
    }

    useEffect(() => {
        const data = localStorage.getItem('listOfFav');
        if (data) {
            setFav(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('listOfFav', JSON.stringify(favItems));
    });

    useEffect(() => {
        fetch(`https://boardgamegeek.com/xmlapi2/hot?type=boardgame`)
            .then(response => response.text())
            .then(data => {
                var xml = new XMLParser().parseFromString(data);
                const results = xml.children.slice(0, 10);
                const searchList = results.map(result => (
                    {
                        id: result.attributes.id,
                        name: result.children[1].attributes.value
                    }
                ));
                setItems(searchList);
            })
    }, []);

    const searchPage = (
        <div className="searchPage">
            <form onSubmit={handleSubmit}>
                <h2>
                    <label htmlFor="search">
                        What board game are you looking for?
                    </label>
                </h2>
                <input
                    type="text"
                    id="search"
                    name="text"
                    value={name}
                    onChange={handleChange}
                />
                <button type="submit">
                    Search
                </button>
            </form>
            <br />
            <div className="searchResults">
                {itemList}
            </div>
        </div>
    );

    const favPage = (
        <div className="favPage">
            <h2>
                Here is your favourite list of board games!
            </h2>
            <label htmlFor="filter">Filter: </label>
            <input type="text" name="filter" onChange={filterName}></input><br /><br />
            {favList.length === 0 ? "No results" : <div className="favResults">{favList}</div>}
        </div>
    );

    return (
        <div>
            <h1>Board Game Lovers</h1>
            <NavBar />
            <button onClick={toggleShowFav}>
                {showFav ? "Back to search" : "Go to favourite"}
            </button>
            {showFav ? favPage : searchPage}
        </div>
    );

}