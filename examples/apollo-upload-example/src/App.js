import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Dropzone from 'react-dropzone';

const uploadFileMutation = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file)
  }
`;

export default () => (
  <Mutation mutation={uploadFileMutation}>
    {mutate => (
      <Dropzone onDrop={([file]) => mutate({ variables: { file } })}>
        <p>Try dropping some files here, or click to select files to upload.</p>
      </Dropzone>
    )}
  </Mutation>
);
