import React from 'react';
import {connect} from 'react-redux';

import ApiVersion from './common/ApiVersion';
import Settings from './common/Settings';
import Projects from './projects/Projects';

function App(props) {
    return <div className="pure-g">
        <div className="pure-u-1-3">
            <ApiVersion apiVersion={props.apiVersion}/>
            <Settings settings={props.context.general.settings} />
        </div>
        <div className="pure-u-2-3">
            <Projects projects={props.context.projects} />
        </div>
    </div>
}

export default connect(
    state => state
)(App);
