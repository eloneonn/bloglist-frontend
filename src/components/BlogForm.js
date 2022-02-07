import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="blogForm">
          <h2>Create new blog</h2>
          <table>
            <tbody>
              <tr>
                <td style={{ textAlign:'right' }}>title:</td>
                <td><input
                  id='title'
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}></input><br></br></td>
              </tr>

              <tr>
                <td style={{ textAlign:'right' }}>author:</td>
                <td><input
                  id='author'
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}></input><br></br>
                </td>
              </tr>

              <tr>
                <td style={{ textAlign:'right' }}>url:</td>
                <td><input
                  id='url'
                  value={url}
                  onChange={({ target }) => setUrl(target.value)}></input> <br></br></td>
              </tr>
            </tbody>
          </table>

          <button type="submit" id="createBlog-button" style={{ marginTop: 5 }}>Create</button>

        </div>
      </form>
    </div>
  )

}

export default BlogForm