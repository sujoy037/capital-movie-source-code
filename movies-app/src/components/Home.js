import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Pager from './Pager';
import { getAllMovies, getFavMovies } from '../api/inbdex';
import CardItem from './CardItem';
import { useParams } from 'react-router-dom';
import { useAlert } from "react-alert";


const Home = ({ user }) => {
  const myAlert = useAlert()
  const params = useParams()
  const { tag } = params
  const [is_loading, setIs_loading] = useState(true)
  const [list, setList] = useState([]);
  const [favList, setFavList] = useState([]);
  const [page, setPage] = useState(1);
  const [isFav, setIsFav] = useState(tag == "favourites" ? true : false)
  const [is_reload, setIs_reload] = useState(false)

  const reload = () => {
    setIs_reload(!is_reload)
  }



  useEffect(() => {
    async function load() {
      setIsFav(tag == "favourites" ? true : false)
      if (tag != "favourites") {
        setIs_loading(true)
        let res = await getAllMovies(page, tag)
        setIs_loading(false)
        if (res.error) {
          setList([])
          return alert(res.message)
        }
        return setList([...res?.data?.results])
      } else {
        setList([])
      }

    }
    load()
    //then(({data})=>console.log(data))
  }, [page, tag])



  useEffect(() => {
    async function load() {
      let res = await getFavMovies()
      setIs_loading(false)
      if (res.error) {
        setFavList([])
        return myAlert.error(res.message)
      }
      // console.log(res.data);
      return setFavList([...res?.data])

    }
    load()
    //then(({data})=>console.log(data))
  }, [is_reload])


  useEffect(() => {
    if (!user) {
      setFavList([])
    }
  }, [user])




  //const link=`https://api.themoviedb.org/3/movie/now_playing?api_key=b33f892bd5da0fa9f0bd0231f4e460e1&language=en-US&page=1`;
  return (

    <div className="container mt-2" >

      <h4 className='mx-3 mt-4' >{tag?.toUpperCase?.()} MOVIE LIST</h4>
      <div>
        <div className="d-flex justify-content-center p-2" style={{
          height: '75vh',
          overflowY: "auto",
          flexWrap: "wrap"
        }}
        >
          {
            is_loading ?
              <h3>
                Loading....
              </h3>
              :
              isFav ?
                (
                  favList?.length === 0 ?
                    user ?
                      <h5 className='my-4' >-- no data found --</h5>
                      :
                      <h5 className='my-4' >-- You are not authorize! Please login! --</h5>
                    :
                    favList?.map((movie, i) => <CardItem user={user} key={i} data={movie} reload={reload} is_reload={is_reload} thisIsFav={true} />)
                )
                :
                (
                  list?.length === 0 ?
                    <h5 className='my-4' >-- no data found --</h5>
                    :
                    list?.map((movie, i) => <CardItem user={user} key={i} data={movie} reload={reload} thisIsFav={favList.filter(info => info?.movie_id == movie?.id)?.length > 0} is_reload={is_reload} />)
                )
          }
        </div>
        {
          !isFav &&
          <div className="row">
            <div className="col">
              <Pager page={page} setPage={setPage} />
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Home
