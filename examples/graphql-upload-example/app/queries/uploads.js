import gql from 'graphql-tag'

export default gql`
  query files {
    workspace {
      projects {
        id
        files {
          filename
          path
          contentType
          size
        }
      }
    }
  }
`
