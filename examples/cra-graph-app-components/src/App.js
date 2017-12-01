import React, { Component } from "react";
import { Cypher } from "graph-app-kit/components/Cypher";
import {
  GraphAppBase,
  ConnectModal,
  CONNECTED
} from "graph-app-kit/components/GraphAppBase";
import { AsciiTable } from "graph-app-kit/components/AsciiTable";
import { Render } from "graph-app-kit/components/Render";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

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
    <div style={{ height: "60px" }}>pending</div>
  ) : error ? (
    <div style={{ height: "60px" }}>{error.message}</div>
  ) : result ? (
    <AsciiTable data={formatRecords(result.records)} />
  ) : null;
};

class MyApp extends Component {
  state = {
    cTag: 1
  };

  reRunManually = () => {
    this.setState(state => ({ cTag: state.cTag + 1 }));
  };
  render() {
    return (
      <div className="App" key="app">
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
        <Render if={this.props.connected}>
          <div>
            <h3>Automatic re-run using interval</h3>
            <Cypher
              query="CALL dbms.queryJmx('org.neo4j:instance=kernel#0,name=Kernel') YIELD attributes
RETURN attributes.StoreId.value as dbStoreId, attributes.DatabaseName.value as dbName, rand() as random1, rand() as random2"
              render={queryResultView}
              interval={3}
            />
            <h3>Manual re-run using cTag</h3>
            <Cypher
              cTag={this.state.cTag}
              query="CALL dbms.queryJmx('org.neo4j:instance=kernel#0,name=Kernel') YIELD attributes
RETURN attributes.StoreId.value as dbStoreId, attributes.DatabaseName.value as dbName, rand() as random1, rand() as random2"
              render={queryResultView}
            />
            <button onClick={this.reRunManually}>Re-run manually</button>
          </div>
        </Render>
      </div>
    );
  }
}

const App = () => {
  return (
    <GraphAppBase
      driverFactory={neo4j}
      integrationPoint={window.neo4jDesktopApi}
      render={({ connectionState, connectionDetails, setCredentials }) => {
        return [
          <ConnectModal
            key="modal"
            errorMsg={connectionDetails ? connectionDetails.message : ""}
            onSubmit={setCredentials}
            show={connectionState !== CONNECTED}
          />,
          <MyApp key="app" connected={connectionState === CONNECTED} />
        ];
      }}
    />
  );
};

export default App;
