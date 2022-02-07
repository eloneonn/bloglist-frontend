import React, { useState } from 'react'

const Blog = (props) => {

  const blog = props.blog

  const [completeInfo, showCompleteInfo] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  // tämä on tässä koska JSON.parse(window.localStorage.getItem('loggedUser')).name aiheuttaa frontin testeissä ongelman (cannot read properties of null)
  // oikeassa tilanteessa tämä ei kuitenkaan koskaan ole null koska kirjautumaton käyttäjä ei näe blogeja
  var loggedUser = JSON.parse(window.localStorage.getItem('loggedUser')) ?? ''

  const handleView = () => {
    showCompleteInfo(!completeInfo)
  }

  const handleRemove = () => {
    if(window.confirm(`Remove "${blog.title}" by ${blog.author}?`)) {
      props.removeBlog(blog)
    }
  }

  const handleLike = async () => {
    await props.likeBlog(blog, likes + 1)
    setLikes(likes + 1)
  }


  return (
    <div className='blog'>
      <div className='blog-header'>{blog.title} - {blog.author} <button onClick={handleView} id="view-button">{completeInfo ? 'hide' : 'view'}</button> </div>

      {!completeInfo ?
        <div></div> :
        <div className='blog-content'>

          <div>
            {blog.url} <br></br>
              likes: {likes} <button onClick={handleLike} id="like-button">like</button> <br></br>
            {blog.author} <br></br>

            {blog.author === loggedUser.name ?
              <button onClick={handleRemove} id="removal-button">remove</button> : <button disabled id="disabled-removal-button">remove</button>
            }

          </div>
        </div>
      }
    </div>
  )

}
/* !OIKEA POISTONAPPI!!!
{blog.author === JSON.parse(window.localStorage.getItem('loggedUser')).name ?
<button onClick={handleRemove}>remove</button> : <button disabled>remove</button>
}
*/
export default Blog