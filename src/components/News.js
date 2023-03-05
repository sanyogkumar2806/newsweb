import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
  const [articales, setArticales] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  document.title= `${props.category} - NewsHub`;


  const updateNews = async ()=>{
  props.setProgress(0);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d3c9614d45cb4a969cb5358e86d54729&page=${page}&pageSize=${props.pageSize}`;
  setLoading(true)
  let data = await fetch(url);
  let parsedData = await data.json()
  props.setProgress(70);
  setArticales(parsedData.articles);
  setTotalResults(parsedData.totalResults);
  setLoading(false);
  props.setProgress(100);
}

useEffect(() =>{
   updateNews();
}, [])


const fetchMoreData = async() => {
  setPage(page+1)
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d3c9614d45cb4a969cb5358e86d54729&page=${ page+1 }&pageSize=${props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  setArticales(articales.concat(parsedData.articles))
  setTotalResults(parsedData.totalResults)
};

    return (
      <div className="container my-2 ">
        <h1 className="text-center py-5">NewsHub - Top Headlines</h1>
        
        {loading && <Spinner />}

        {/* infinite scroll ke liye */}
        <InfiniteScroll
          dataLength={articales.length}
          next={fetchMoreData}
          hasMore={articales.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>

        

        <div className="row">
        

          {/* this.state.articales sare articales ko utayega of 
        fir.map inko ek higher order array me daal dega because map ka mtlb hai ek higher order array */}
        {articales.map((element)=>{

          {/* md-4 mtlb ye colum ki line me container ki 4 space lenge 
          or ek container me total 12 space hoti hai is hisab se 
          per card ek line me 4 space lega or total hai 3 card so 4*3= 12 
          to ek pure column me 3 dard aayenge with 4 space. */}
          return <div className="col-md-4" key={element.url}>
                  {/* YE jo hm element ke aage likh rhe hai ye hmare articles ke object ke andr define hai */}
                  <NewsItem  title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 70):""} 
                  // imgUrl={element.urlToImage} 
                  imgUrl={element.urlToImage?element.urlToImage:"https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/F9D1/production/_128835936_vaughan.jpg"} 
                  newsUrl={element.url} author={element.author?element.author:"Unknown"} date={element.publishedAt}/>
                  {/* slice wala method card ke andr words ko limit dene ke liye use kiya gya gya hai */}
                  </div>
        })}
        </div>

        </div>
        </InfiniteScroll>

      </div>
    )
  
}

export default News

News. defaultProps = {
  country: 'in',
  category: "general",
  pageSize: 8
}
News. propTypes = {
    country: propTypes.string,
    category: propTypes.string,
    pageSize: propTypes.number,
}