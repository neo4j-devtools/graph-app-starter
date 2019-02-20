import React from 'react';
import _ from 'lodash';

export default function Graph({graph}) {
    const protocol = (name, protocol) => {
        return <li>
            {name}
            <ul>
                {
                    _.keys(protocol).map((key) => (
                        <li key={key}>{key}: {String(protocol[key])}</li>
                    ))
                }
            </ul>
        </li>
    };
    return (<ul>
        <li>
            {graph.name}
            <ul>
                <li><b>ID:</b> {graph.id}</li>
                <li><b>Status:</b> {graph.status}</li>
                <li><b>Description:</b> {graph.description}</li>
                <li>
                    <b>Connection:</b>
                    <ul>
                        <li><b>Type:</b> {graph.connection.type}</li>
                        <li><b>Database type:</b> {graph.connection.databaseType}</li>
                        <li><b>Database status:</b> {graph.connection.databaseStatus}</li>
                        <li>
                            <b>Info:</b>
                            <ul>
                                <li><b>Version:</b> {graph.connection.info.version}</li>
                                <li><b>Edition:</b> {graph.connection.info.edition}</li>
                            </ul>
                        </li>
                        <li>
                            <b>Configuration</b>
                            <ul>
                                <li><b>Path:</b> {graph.connection.configuration.path}</li>
                                <li>
                                    <b>Protocols:</b>
                                    <ul>
                                        {protocol('bolt', graph.connection.configuration.protocols.bolt)}
                                        {protocol('http', graph.connection.configuration.protocols.http)}
                                        {protocol('https', graph.connection.configuration.protocols.https)}
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>);
}

