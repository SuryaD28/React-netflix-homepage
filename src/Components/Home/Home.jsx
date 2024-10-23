import React, { useEffect, useState } from 'react';
import "./Home.scss";
import axios from 'axios';


const apiKey = "2549b3819a0a63566f6daa64101964db";
const url = "https://api.themoviedb.org/3";
const imgurl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated"


const Card = ({img}) => <img className='card' src={img} alt='cover' />
const Row = ({title, arr=[] ,}) => (
    <div className='row'>

        <h2>{title}</h2>
       <div>
        {
            arr.map((item , index) => (
                <Card key={index} img={`${imgurl}/${item.poster_path}`}/>
            ))
        }
       </div>
    </div>
)

const Home = () => {

    const [upcomingmovies , setupcomingmovies] = useState([]);
    const [nowplayingMovies , setnowplayingMovies] = useState([]);
    const [popularMovies , setpopularMovies] = useState([]);
    const [topratedMovies ,  settopratedMovies] = useState([]);
   

  useEffect(() => {
 
    const fetchUpcoming = async() => {
      const {data:{results},} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}&page=2`)
      setupcomingmovies(results)
    };
    const fetctNowplaying = async() => {
        const {data:{results},} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
        setnowplayingMovies(results)
    };
    const fetchPopular = async() => {
        const {data:{results},} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
        setpopularMovies(results)
    };
    const fetchToprated = async() => {
        const {data:{results},} = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
        settopratedMovies(results)
    };

    fetchUpcoming();
    fetctNowplaying();
    fetchPopular();
    fetchToprated();
  } , [])

  return (
    <section className='home'>
       <div className='banner'style={{
        backgroundImage: popularMovies[0]? `url(${`${imgurl}/${popularMovies[0].poster_path}`})`:"rgb(16,16,16)"
       }}>

        {
            popularMovies[0] &&
            (
                <h1>{popularMovies[0].original_title}</h1>
            )
        }

       {
            popularMovies[0] &&
            (
                <p>{popularMovies[0].overview}</p>
            )
        }
        
    

       </div>

          <Row title={"Upcoming "} arr={upcomingmovies}/>
          <Row title={"Now Playing "} arr={nowplayingMovies}/>
          <Row title={"Popular "} arr={popularMovies}/>
          <Row title={"TopRated "} arr={topratedMovies}/>
          
    </section>
  )
}

export default Home