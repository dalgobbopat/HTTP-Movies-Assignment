import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: ['']
}

const UpdateMovie = props => {
    const { push } = useHistory()
    const [movie, setMovie] = useState(initialMovie)
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log({ res })
            setMovie(res.data)
        })
        .catch(err => { console.log({ err })
    })
    }, [id])

    const handleChange = e => {
        e.persist()
        let value = e.target.value
        if(e.target.name === 'metascore'){
            value = parseInt(value, 10)
        }

        if (e.target.name === 'stars'){
            value = e.target.value.split(',')
        }

        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
           const updateMovie = res.data
           const newList = props.movieList.filter(movie => movie.id !== updateMovie.id)
           props.setMovieList([
               ...newList,
               updateMovie
           ]);
           push('./')
        })

    }
    
    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={submitForm}>
                <input 
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                value={movie.title}
                />
                <input 
                type="text"
                name="director"
                onChange={handleChange}
                placeholder="Director"
                value={movie.director}
                />
                <input 
                type="text"
                name="metascore"
                onChange={handleChange}
                placeholder="Metascore"
                value={movie.metascore}
                />
                <input 
                type="text"
                name="stars"
                onChange={handleChange}
                placeholder="Stars"
                value={movie.stars}
                />
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie