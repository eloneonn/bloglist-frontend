import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Blog testing', () => {
  test('Renders initial content correctly', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Tester',
      likes: 0
    }

    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library')

    expect(component.container).toHaveTextContent(
      'Tester')

  })

  test('Renders content correctly once button has been pressed', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Tester',
      likes: 0,
      url: 'www.test.com'
    }

    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library')

    expect(component.container).toHaveTextContent(
      'www.test.com')

    expect(component.container).toHaveTextContent(
      'likes: 0')

  })

  test('Like-button works', () => {
    const handleLike = jest.fn()

    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Tester',
      likes: 0,
      url: 'www.test.com'
    }

    const component = render(
      <Blog blog={blog} likeBlog={handleLike} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)
    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)


    expect(handleLike.mock.calls).toHaveLength(2)

  })
})

describe('Blogform testing', () => {

  test('Create blog works', () => {
    const createBlog = jest.fn()


    const component = render(
      <BlogForm createBlog={createBlog}/>
    )

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    const expectedBlog = {
      title: 'This is a blog about testing',
      author: 'Tester',
      url: 'www.test.com'
    }

    fireEvent.change(title, {
      target: { value: 'This is a blog about testing' }
    })

    fireEvent.change(author, {
      target: { value: 'Tester' }
    })

    fireEvent.change(url, {
      target: { value: 'www.test.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls[0]).toContainEqual(expectedBlog)

  })


})