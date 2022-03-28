import React from 'react'
import ReadMoreReact from 'read-more-react';

const MovieCard = ({list}) => {
  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <img className="img-thumbnail" src={`https://image.tmdb.org/t/p/w500/${ list && list.poster_path}`} alt={`${list && list.title} Poster`}/>
          <h5 class="card-title">Title:{list.title}</h5>
          <h5 class="card-title">Release Year:{list.release_date}</h5>
          <i class="fa-solid fa-star">Rate:{list.vote_average}</i>
          {/* <p class="card-text">OverView{list.overview}</p> */}
          <ReadMoreReact text={list.overview}
                min={80}
                ideal={80}
                max={80}
                readMoreText="click here to read more"/>
        </div>       
      </div>
    </div>
   
  )
}

export default MovieCard