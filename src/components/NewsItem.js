import React from 'react'

const NewsItem = (props) => {

    

    // Classbase components me aise props diye jate hai 
    let {title, description, imgUrl, newsUrl, author, date} = props;
    return (
      <div className='container'>

            {/*  or {{}} in double brackets ke andr objects diye jate hai uske liye double brackets ki jrurat hoti hai */}
           <div className="card my-2" >
                <img src={imgUrl} className="card-img-top" alt="..."/>
                <div className="card-body">

            {/* or is trah define kre jate hai */}
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>

                {/* .toGTMString() use hota hai proper date and time ata hai as string  */}
                <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toGMTString()}</small></p>
                {/* target= _blank hm isliye krte hai taki open hone wali chiz new tab me open ho */}
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
      </div>
    )
  
}

export default NewsItem