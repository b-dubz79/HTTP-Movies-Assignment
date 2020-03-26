import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useHistory} from 'react-router-dom'


const initialMovieData  = 
    {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
        
      };

      const UpdateMovieForm = props => {
          //get params and history objects
          const { id } = useParams();
          const { push } = useHistory();
      

      const [movie, setMovie] = useState(initialMovieData);
// Maybe do a use state here to set state initially [movieList] = usestate(props.movieList)
      // ********** Find the item and set it to state ********** //
  // get the id from params
  // loop through the items list to find the item
  // set the item to state to pre-populate the form\

      useEffect(() => {
        if(props.movieList){
            const movieToUpdate = props.movieList.find(movie => `${movie.id}` === id);
            console.log('!!!!!', props.movieList)
            if (movieToUpdate) {
                setMovie(movieToUpdate)
            }
        }
      }, [props.movieList, id])

      const handleChange = e => {
          setMovie({
              ...movie,
              [e.target.name]: e.target.value
          })
      }
// ********** Find the item and set it to state ********** //


      const handleSubmit = e => {
          e.preventDefault()
      

      // ********** Make the put request ********** //

      axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            // update state in App through the setter function
        // navigate user to the item page (or to the shop)
        // (Potentially, you could just show a success message without navigating)
        props.setMovieList(res.data);
        push(`/update-movie/${id}`)
        })
        .catch(err => console.log(err))
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                id='id'
                type='text'
                name='title'
                onChange={handleChange}
                value={movie.title}
                />
                 <input
                id={movie.id}
                type='text'
                name='director'
                onChange={handleChange}
                value={movie.director}
                />
                 <input
                id={movie.id}
                type='text'
                name='id'
                onChange={handleChange}
                value={movie.id}
                />
                 <input
                id={movie.id}
                type='text'
                name='metascore'
                onChange={handleChange}
                value={movie.metascore}
                />
                <button type='submit'>Update</button>
            </form>
        </div>
    )

}

    export default UpdateMovieForm;
