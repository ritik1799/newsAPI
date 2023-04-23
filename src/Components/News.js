import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
    
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase()+ string.slice(1);

  }

constructor(props){
  super(props);
  this.state={
      articles:[],
      loading: true,
      page: 1,
      totalResults:0
  }
  document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonk`;
}

async updateNews() {
  this.props.setProgress(10);
  const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=4313a84c5f3d4627a5cd40a92c73ea2c&page=1&pageSize=${this.props.pageSize}`;
  this.setState({loading: true});
  let data = await fetch(url);
  this.props.setProgress(50);
  let parsedData=await data.json()
  console.log(parsedData);
  this.setState({articles: parsedData.articles,
    totalResults:parsedData.totalResults,
  loading:false})
  this.props.setProgress(100);
}


async componentDidMount(){
  this.updateNews();
}

fetchMoreData = async () => {
 this.setState({page : this.state.page + 1});
 const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=4313a84c5f3d4627a5cd40a92c73ea2c&page=1&pageSize=${this.props.pageSize}`;
 let data = await fetch(url);
 let parsedData=await data.json()
 this.setState({
  articles: this.state.articles.concat(parsedData.articles),
   totalResults:parsedData.totalResults})
};

// handlePreviousClick = async ()=> {
//   console.log("previous");
//   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=4313a84c5f3d4627a5cd40a92c73ea2c&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
//   this.setState({loading: true});
//   let data = await fetch(url);
//   let parsedData=await data.json()
//   console.log(parsedData);
//   this.setState({
//     page:this.state.page-1,
//     articles: parsedData.articles,
//     loading:false
//   })
// }

// handleNextClick = async ()=> {
//   if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
//   console.log("next");
//   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=4313a84c5f3d4627a5cd40a92c73ea2c&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
//   this.setState({loading: true});
//   let data = await fetch(url);
//   let parsedData=await data.json()

//   this.setState({
//     page:this.state.page+1,
//     articles: parsedData.articles,
//     loading: false
//   })
//   }
 
// }

  render() {
    return (
      <>

        <h2 className="text-center" style={{margin:'35px 0px', marginTop:'90px'}}>NewsMonk - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
       {this.state.loading && <Spinner/>} 
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
    loader={<Spinner/>}> 
      <div className="container">

      
       <div className="row">
        {this.state.articles.map((element)=>{
        return  <div className="col-md-4" key={element.url}>
        <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
        </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      */}
    
        </>
  
    )
  }
}

export default News
