import React from 'react';
import _ from 'lodash';

export default function Graph({graph}) {
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
                        <li><b>Info:</b> {graph.connection.type}</li>
                        <li>
                            <b>Info:</b>
                            <ul>
                                {
                                    _.keys(graph.connection.info).map((key) => (
                                        <li key={key}>{key}: {(graph.connection.info[key] || "").toString()}</li>
                                    ))
                                }
                            </ul>
                        </li>
                        <li>
                            <b>Configuration</b>
                            <ul>
                                {
                                    _.keys(graph.connection.configuration).map((key) => (
                                        <li key={key}>{key}: {(graph.connection.configuration[key] || "").toString()}</li>
                                    ))
                                }
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>);
}

