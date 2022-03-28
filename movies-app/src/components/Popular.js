import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios';
import MovieCard from './MovieCard';
import Pager from './Pager';

const Popular = () => {
  const[list,setList]=useState();

  let [page,setPage]=useState(1);

  useEffect(()=>{
    axios
        .get(`https://api.themoviedb.org/3/movie/popular?api_key=b33f892bd5da0fa9f0bd0231f4e460e1&language=en-US&page=${page}`)
        .then(({data})=>setList(data.results)).catch((err)=>console.log(err))
        //then(({data})=>console.log(data))


        //const link=https://api.themoviedb.org/3/movie/popular?api_key=b33f892bd5da0fa9f0bd0231f4e460e1&language=en-US&page=1

  },[page])
  return (
    <div className="container">
      <div className="row">
        {
          list && list.map((movie)=><MovieCard list={movie}/>)
        }
      </div>
      <div className="row">
        <div className="col">
        <Pager  page={page} setPage={setPage}/>  
        </div>
      </div> 
    </div>  
  )
}

export default Popular