import React from 'react';

import Graphs from './graphs/Graphs';

export default function Project({project}) {
    return <div>
        <hr />
        <h3>{project.name}</h3>
        <p>
            <b>ID:</b> {project.id}
        </p>
        <h4>Graphs</h4>
        <Graphs graphs={project.graphs} />
    </div>;
}
