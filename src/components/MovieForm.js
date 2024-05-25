import React, { useState } from "react";
import classes from './MovieForm.module.css';

const MovieForm = () => {

    const [title, setTitle] = useState('');
    const [openingText, setOpeningText] = useState('');
    const [date, setDate] = useState('');

    const formHandler = (event) => {
        event.preventDefault();

        const movieForm = {
            title: title,
            openingText: openingText,
            releaseDate:date
        };

        console.log(movieForm);

        setDate('');
        setOpeningText('');
        setTitle('');

    };

    return (
        <div>
            <form className={classes.form} onSubmit={formHandler}>
                <div>
                <label htmlFor="title">Title</label>
                <input 
                    id="title" 
                    type="text" 
                    value={title} 
                    onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div>
                <label htmlFor="open">Opening Text</label>
                <input 
                    id="open" 
                    type="text"
                    value={openingText} 
                    onChange={(event) => setOpeningText(event.target.value)} />
                </div>
               <div>
               <label htmlFor="date"> Release Date</label>
                <input 
                    id="date" 
                    type="date"
                    value={date} 
                    onChange={(event) => setDate(event.target.value)} />
               </div>
                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
};

export default MovieForm;