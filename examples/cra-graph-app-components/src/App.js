import React, { Component } from "react";
import { DriverProvider, Cypher } from "graph-app-kit/utils";
import {
  DesktopIntegration,
  helpers
} from "graph-app-kit/utils/DesktopIntegration";
import { AsciiTable, Render } from "graph-app-kit/ui";
import "./App.css";

const neo4j = require("neo4j-driver/lib/browser/neo4j-web.min.js").v1;

const formatRecords = records => {
  let out = [[...records[0].keys]];
  records.forEach(record => {
    out.push(record._fields);
  });
  return out;
};

const queryResultView = ({ pending, error, result }) => {
  return pending ? (
    "pending"
  ) : error ? (
    error.message
  ) : result ? (
    <AsciiTable data={formatRecords(result.records)} />
  ) : null;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.driver = null;
  }
  state = {
    driverCredentials: null
  };
  onConnectionChange = context => {
    const creds = helpers.getActiveCredentials("bolt", context);
    const driverCredentials = {
      host: `bolt://${creds.host}:${creds.port}`,
      encrypted: creds.tlsLevel === "REQUIRED",
      username: creds.username || null,
      password: creds.password || null
    };
    this.setState({ driverCredentials }, this.connectDriver);
  };
  connectDriver = () => {
    if (this.driver) this.driver.close();
    const {
      host,
      username,
      password,
      encrypted
    } = this.state.driverCredentials;
    const auth =
      username && password ? neo4j.auth.basic(username, password) : undefined;
    this.driver = neo4j.driver(host, auth, { encrypted });
    this.forceUpdate();
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Graph app demo</h1>
        </header>
        <p>
          This application connects to the active Neo4j graph and executes a
          cypher query on it every 3 secods and display its result in an ascii
          table.
        </p>
        <p>
          It also picks up connection changes and executes queries over the new
          connection.
          <br />This app only works for local connection without authentication,
          or remote connections.
        </p>

        <DesktopIntegration
          integrationPoint={window.neo4jDesktopApi}
          onMount={context => this.onConnectionChange(context)}
          onGraphActive={(_, context) => this.onConnectionChange(context)}
        />
        <Render if={this.driver !== null}>
          <DriverProvider driver={this.driver}>
            <Cypher
              query="CALL dbms.queryJmx('org.neo4j:instance=kernel#0,name=Kernel') YIELD attributes
              RETURN attributes.StoreId.value as dbStoreId, attributes.DatabaseName.value as dbName, rand() as random1, rand() as random2"
              render={queryResultView}
              interval={3}
            />
          </DriverProvider>
        </Render>
      </div>
    );
  }
}

export default App;
