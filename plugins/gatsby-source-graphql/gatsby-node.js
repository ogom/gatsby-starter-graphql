const crypto = require('crypto')
const fetch = require('node-fetch')

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators
  const fetchInit = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query: `{
        posts {
          id
          title
          body
          comments {
            id
            body
          }
        }
      }`,
    }),
  }

  const body = await fetch('http://localhost:3000/graphql', fetchInit).then(
    responce => responce.json()
  )

  body.data.posts.forEach(post => {
    createNode({
      post,
      id: post.id + '',
      children: [],
      parent: 'posts',
      internal: {
        type: 'posts',
        content: JSON.stringify(post),
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(post))
          .digest(`hex`),
      },
    })
  })

  return
}
