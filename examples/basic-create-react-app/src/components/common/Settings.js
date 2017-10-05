import React from 'react';
import _ from 'lodash';

export default function Settings({settings}) {
    const settingKeys = _.keys(settings)
        .filter((key) => !key.includes('_'));

    return <div>
        <h3>Settings</h3>

        <table className="pure-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                </tr>
            </thead>

            <tbody>
                {settingKeys.map((key) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{settings[key].toString()}</td>
                    </tr>)
                )}
            </tbody>
        </table>

    </div>;
}
