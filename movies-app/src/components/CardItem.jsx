import React, { useEffect, useState } from 'react'
// import ReadMoreReact from 'read-more-react';
import { useAlert } from "react-alert";
import { postNewFav, removeFav } from '../api/inbdex';



const CardItem = ({user,  data, reload, thisIsFav }) => {
    const myAlert = useAlert()
    const item = data?.data ? { ...data.data, movie_id: data?.movie_id } : { ...data }
    const [readMore, setReadMore] = useState(false)
    const [is_loading, setIs_loading] = useState(false)


    const handleFav = async () => {
        if (!user) return myAlert.error("Please login to add your favourite movie!")
        setIs_loading(true)
        if (thisIsFav) {
            const res = await removeFav(item?.id)
            if (res?.error) return myAlert.error(res?.message)
            myAlert.error('Movie removed from favourite list!')
        } else {
            const res = await postNewFav(item)
            if (res?.error) return myAlert.error(res?.message)
            myAlert.success('Movie added to favourite list!')

        }
        setIs_loading(false)
        return reload?.()
    }

    // useEffect(() => {
    //     // if (item?.movie_id) {
    //     //     setIsFav(true)
    //     // } else {
    //         let arr = favList.filter(info => info?.movie_id == item?.id)
    //         if (arr.length > 0) {
    //             console.log("fav");
    //             setIsFav(true)
    //         } else {
    //             setIsFav(false)
    //         }
    //     // }
    // }, [favList])




    return (
        <div className="card card-body m-2 p-0" style={{ width: '30%', maxWidth: "30%", height: "600px", boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.6)", borderRadius: "10px" }} >

            <img loading='lazy' style={{ objectFit: "cover", borderRadius: "10px", height: readMore ? "30%" : "70%", backgroundColor: "#ddd" }} className="img-thumbnail m-0 p-0" src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={`${item?.title} Poster`} />
            <div className='px-4 py-2' style={{ height: readMore ? "70%" : "30%" }}  >
                <div className="card-title h5">{item?.title}</div>
                <div className="card-title h6">Release Year: <b> {item?.release_date}</b></div>
                <div>
                    Rate: {item?.vote_average}
                    <i className="fa-solid fa-star"></i>
                </div>
                {/* <p class="card-text">OverView{item.overview}</p> */}
                {/* <div style={{ height: "35%", overflowY: "auto" }} > */}
                {/* <ReadMoreReact text={item?.overview}
                    min={30}
                    ideal={30}
                    max={30}
                    readMoreText="...read more"
                /> */}
                {/* </div> */}
                <div style={{ overflowY: "auto" }} >
                    {
                        readMore ?
                            item?.overview
                            :
                            item?.overview?.slice(0, 25) + " ..."
                    }
                    {
                        item?.overview?.length > 25 &&
                        <span onClick={() => setReadMore(!readMore)} className='text-info' > read {readMore ? "less" : "more"}</span>
                    }
                </div>


            </div>
            <div style={{
                height: "36px",
                width: "35px",
                backgroundColor: "#fff",
                boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.6)",
                borderRadius: "50%",
                position: "absolute",
                top: "5px",
                right: "5px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
                onClick={() => is_loading ? null : handleFav()}
            >
                {
                    thisIsFav ?
                        <i className={`fas fa-heart`} style={{ fontSize: "24px", color: "red" }} ></i>
                        :
                        <i className={`far fa-heart`} style={{ fontSize: "24px" }} ></i>
                }
            </div>
        </div>

    )
}

export default CardItem