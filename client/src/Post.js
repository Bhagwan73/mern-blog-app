import { Link } from "react-router-dom"

export default function Post(posts){
   const {_id,title,summary,blogImage,createdAt,author}=posts.data
   return (
    <div className="post">
    <div className="image">
      <Link to={`/post/${_id}`} >
      <img src={blogImage} alt="Example Image" />
    </Link>
    </div>
    
    <div className="text">
    <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
         <p className="info">
            <span className="author">{author.name}</span>
            <time>{createdAt.slice(0,10)+"    "+createdAt.slice(11,19)}</time>
        </p>
        </Link>
        <p className="summery"> {summary} </p>
    </div>
</div>

   )
}