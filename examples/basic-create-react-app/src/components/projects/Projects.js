import React from 'react';

import Project from './Project'

export default function Projects({projects}) {
    if (projects.length === 0) {
        return <div>No Projects created yet</div>;
    }
    return <div>
        {projects.map((project) => (<Project key={project.id} project={project} />))}
    </div>
}
