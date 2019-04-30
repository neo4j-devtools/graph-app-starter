import React from 'react';
import {connect} from 'react-redux';

import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {createUploadLink} from 'apollo-upload-client'

import Section from "./components/Section";
import UploadFile from "./components/UploadFile";
import UploadBlob from "./components/UploadBlob";
import Uploads from "./components/Uploads";

const createApolloClient = (cache = {}) =>
    new ApolloClient({
        ssrMode: typeof window !== 'undefined',
        cache: new InMemoryCache().restore(cache),
        link: createUploadLink({uri: 'http://localhost:4000'})
    });

function App(props) {

    const apolloClient = createApolloClient();
    // const apolloCache = apolloClient.cache.extract();

    //TODO: pass to the components

    return <div>
        <Section heading="Upload Files">
            <UploadFile/>
        </Section>
        <Section heading="Upload Blob">
            <UploadBlob/>
        </Section>
        <Section heading="Uploads">
            <Uploads/>
        </Section>
    </div>
}

export default connect(
    state => state
)(App);
