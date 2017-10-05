/* global neo4jDesktopApi */

export default (store) => {
    store.dispatch({
        type: 'API_VERSION',
        version: neo4jDesktopApi.version
    });

    neo4jDesktopApi.onContextUpdate((event, newContext, oldContext) => {
        console.log("Desktop Event: ", event);

        store.dispatch({
            type: 'CONTEXT_UPDATE',
            event: event,
            context: newContext
        });
    });

    neo4jDesktopApi.getContext()
        .then(context => {
            store.dispatch({
                type: 'CONTEXT_UPDATE',
                context: context
            });
        })
}
