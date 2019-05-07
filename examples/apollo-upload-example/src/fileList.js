import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const loadFileList = gql`
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
`;

export default () => (
    <Query query={loadFileList}>
        {({loading, error, data}) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            console.log(data);

            return (
                <div>
                    {data.workspace.projects.map(project => (
                        <table>
                            <thead>
                            <tr>
                                <th>Filename</th>
                                <th>MIME type</th>
                                <th>Path</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                project.files.map(
                                    ({filename, contentType, path, size}) => (
                                        <tr key={filename}>
                                            <td>{filename}</td>
                                            <td>{contentType}</td>
                                            <td>{path}</td>
                                            <td>{size}</td>
                                        </tr>
                                    )
                                )
                            }
                            </tbody>
                        </table>
                    ))}

                </div>

            );
        }}
    </Query>
);
