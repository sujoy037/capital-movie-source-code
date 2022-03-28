import React from 'react'
import ReadMoreReact from 'read-more-react';

const MovieCard = ({ list }) => {
  return (
    <div className="col-lg-4 col-md-5" >
      <div className="card"  >
        <div className="card-body" >
          <img loading='lazy' className="img-thumbnail" src={`https://image.tmdb.org/t/p/w500/${list && list.poster_path}`} alt={`${list && list.title} Poster`} />

          <h5 className="card-title">Title:{list.title}</h5>
          <h5 className="card-title">Release Year:{list.release_date}</h5>
          <i className="fa-solid fa-star">Rate:{list.vote_average}</i>
          {/* <p class="card-text">OverView{list.overview}</p> */}
          <ReadMoreReact text={list.overview}
            min={80}
            ideal={80}
            max={80}
            readMoreText="...read more" />
        </div>
      </div>
    </div>

  )
}

export default MovieCard