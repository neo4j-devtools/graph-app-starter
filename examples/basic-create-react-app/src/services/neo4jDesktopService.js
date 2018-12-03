/* global neo4jDesktopApi */

import {split} from 'apollo-link';
import {createHttpLink} from "apollo-link-http";
import {WebSocketLink} from "apollo-link-ws";
import {setContext} from "apollo-link-context";
import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {getMainDefinition} from 'apollo-utilities';

import getWorkspaceQuery from './getWorkspaceQuery';
import onWorkspaceChangeSub from './onWorkspaceChangeSub';

export default (store) => {
    store.dispatch({
        type: 'API_VERSION',
        version: neo4jDesktopApi.version
    });

    const url = new URL(window.location.href);
    const apiEndpoint = url.searchParams.get('neo4jDesktopApiUrl');
    const apiClientId = url.searchParams.get('neo4jDesktopGraphAppClientId');
    const appId = url.searchParams.get('neo4jDesktopGraphAppId');

    const httpLink = createHttpLink({
        uri: `http://${apiEndpoint}/`,
    });

    const wsLink = new WebSocketLink({
        uri: `ws://${apiEndpoint}/`,
        options: {
            reconnect: true,
            connectionParams: {
                ClientId: apiClientId,
                AppId: appId
            }
        }
    });

    const authLink = setContext((_, {headers}) => {
        return {
            headers: {
                ...headers,
                ClientId: apiClientId,
                AppId: appId,
            }
        }
    });

    const link = split(
        // split based on operation type
        ({query}) => {
            const {kind, operation} = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        authLink.concat(httpLink),
    );

    const client = new ApolloClient({
        link: link,
        cache: new InMemoryCache()
    });

    client.query({
        query: getWorkspaceQuery
    }).then(({data: {getWorkspace: context}}) => {
        store.dispatch({
            type: 'CONTEXT_UPDATE',
            context: context
        });
    });

    let observable = client.subscribe({
        query: onWorkspaceChangeSub
    });
    observable.subscribe(({data: {onWorkspaceChange: context}}) => {
        store.dispatch({
            type: 'CONTEXT_UPDATE',
            context
        });
    });

}
