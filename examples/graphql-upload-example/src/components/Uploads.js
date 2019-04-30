import React from 'react';
import { graphql } from 'react-apollo'
import uploadsQuery from '../queries/uploads'
import { Table, Head, Cell } from './Table'

const Uploads = ({
  data: {
    workspace: { projects }
  }
}) => (
  <div>
    {projects.map(project => (
      <Table
        key={project.id}
        thead={
          <tr>
            <Head>Filename</Head>
            <Head>MIME type</Head>
            <Head>Path</Head>
          </tr>
        }
        tbody={project.files.map(
          ({ id, filename, contentType, path, size }) => (
            <tr key={id}>
              <Cell>{filename}</Cell>
              <Cell>{contentType}</Cell>
              <Cell>{path}</Cell>
              <Cell>{size}</Cell>
            </tr>
          )
        )}
      />
    ))}
  </div>
)

export default graphql(uploadsQuery)(Uploads)
