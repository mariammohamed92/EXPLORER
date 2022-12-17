import React ,{useEffect,useState} from 'react'
import axios from 'axios'
import MediaItem from '../MediaItem/MediaItem';
import {Helmet} from "react-helmet";

export default function Home() {

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);

  async function getTrending(mediaType , callback)
  {
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=bd7de1002d5d536889f2190d815dc7ec`)
     callback(data.results);
  }
useEffect(() => {
  getTrending('movie',setTrendingMovies);
  getTrending('tv',setTrendingTv );
  getTrending('person' , setTrendingPeople);
}, []);

  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Home" />
                <title>Home Page</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <div className="row py-5">
    <div className="col-md-4 d-flex align-items-center">
      <div>
      <div className="brdr w-25 mb-3"></div>
      <h2 className=' h4'>Trending Movies <br/> To Watch Right Now</h2>
      <p className=' py-2 text-muted'>Watched Movies To Watch Right Now</p>
      <div className="brdr w-100 mt-3"></div>
      </div>
    </div>
    {trendingMovies.slice(0,10).map((item ,index)=> <MediaItem key={index} item={item}/>)}
  </div>
  <div className="row py-5">
    <div className="col-md-4 d-flex align-items-center">
      <div>
      <div className="brdr w-25 mb-3"></div>
      <h2 className=' h4'>Trending Tv <br/> To Watch Right Now</h2>
      <p className=' py-2 text-muted'>Watched Tv To Watch Right Now</p>
      <div className="brdr w-100 mt-3"></div>
      </div>
    </div>
    {trendingTv.slice(0,10).map((item ,index)=> <MediaItem key={index} item={item}/>)}
  </div>
  <div className="row py-5">
    <div className="col-md-4 d-flex align-items-center">
      <div>
      <div className="brdr w-25 mb-3"></div>
      <h2 className=' h4'>Trending People <br/> To Watch Right Now</h2>
      <p className=' py-2 text-muted'>Watched People To Watch Right Now</p>
      <div className="brdr w-100 mt-3"></div>
      </div>
    </div>
    {trendingPeople.filter((person)=>person.profile_path!==null).slice(0,10).map((item ,index)=> <MediaItem key={index} item={item}/>)}
  </div>
  </>
}
