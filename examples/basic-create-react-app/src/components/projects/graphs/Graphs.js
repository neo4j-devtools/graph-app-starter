import React from 'react';

import Graph from './Graph';

export default function Graphs({graphs}) {
    if (graphs.length === 0) {
        return <div>No Graphs created yet</div>;
    }
    return graphs.map((graph) => (<Graph key={graph.id} graph={graph} />))
}
