import React, { useState } from "react";

export default function FavItem(props) {
    const [isLike, setLike] = useState(props.fav);
    const [itemNote, setNote] = useState(props.note);

    function handleClick() {
        if (!isLike) {
            props.addFav(props.id, props.name);
        } else {
            props.removeFav(props.id);
        }
        setLike(!isLike);
    }

    function handleSave() {
        const note = document.getElementById(props.id).value;
        setNote(note);
        const updatedFav = props.favItems.map(item => {
            if (item.id === props.id) {
                return { ...item, note: note };
            }
            return item;
        });
        props.setFav(updatedFav);
        alert("Note is saved!");
    }

    return (
        <div className="favItems" key={props.id}>
            <h4>{props.name}</h4>
            <div className="details">
                Year published: {props.year} <br />
                No. of players: {props.players} <br />
                Minimum age: {props.age} <br />
                Playing time: {props.playTime}
            </div>
            {props.url ? <img src={props.url} alt="" /> : ""}
            <i
                className="fa fa-heart"
                style={{ color: isLike ? 'pink' : 'grey' }}
                onClick={handleClick}
            >
            </i>
            <div className="note">
                <label htmlFor="note">Note:</label><br />
                <textarea id={props.id} name="note" defaultValue={itemNote}></textarea><br />
                <button htmlFor="note" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}