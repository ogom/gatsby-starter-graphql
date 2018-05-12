import React from 'react'
import Link from 'gatsby-link'

const SecondPage = ({ data }) => (
  <div>
    <h1>{data.posts.post.title}</h1>
    <p>{data.posts.post.body}</p>
    <Link to="/">Go back to the homepage</Link>
  </div>
)

export default SecondPage

export const query = graphql`
  query PostsQuery {
    posts(id: { eq: "2" }) {
      post {
        title
        body
      }
    }
  }
`
