import React from 'react';

import LocalGraph from './LocalGraph';
import RemoteGraph from './RemoteGraph';

export default function Graphs({graphs}) {
    if (graphs.length === 0) {
        return <div>No Graphs created yet</div>;
    }
    return graphs.map((graph) => {
        if (graph.connection.type === 'LOCAL') {
            return <LocalGraph key={graph.id} graph={graph} />;
        }
        if (graph.connection.type === 'REMOTE') {
            return <RemoteGraph key={graph.id} graph={graph} />;
        }
        return <div>Unknown Graph Connection Type</div>
    });
}
