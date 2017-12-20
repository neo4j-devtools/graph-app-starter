import React, {Component} from "react";

import {
  Container,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react';

import {
  GraphAppBase,
  ConnectModal,
  CONNECTED
} from "graph-app-kit/components/GraphAppBase";
import { Cypher } from "graph-app-kit/components/Cypher";
import { AsciiTable } from "graph-app-kit/components/AsciiTable";
import { Render } from "graph-app-kit/components/Render";

const neo4j = require("neo4j-driver/lib/browser/neo4j-web.min.js").v1;

const formatRecords = records => {
  let out = [
    [...records[0].keys]
  ];
  records.forEach(record => {
    out.push(record._fields);
  });
  return out;
};

const queryResultView = ({pending, error, result}) => {
  return pending
    ? ("pending")
    : error
      ? (error.message)
      : result
        ? (<AsciiTable data={formatRecords(result.records)}/>)
        : null;
};

class ConnectedApp extends Component {

  state = {
    cTag: 1
  };

  reRunManually = () => {
    this.setState(state => ({ cTag: state.cTag + 1 }));
  };

  render() {

    return (
      <div>
        <Segment inverted textAlign='center' style={{
          padding: '1em 0em'
        }} vertical>

          <Container text>
            <Header as='h1' content='Graph App Demo' inverted style={{
              fontSize: '4em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: '1em'
            }}/>
            <Header as='h2' inverted style={{
              fontSize: '1.7em',
              fontWeight: 'normal'
            }}>
              <Header.Content>
                {'Neo4j \u21A4 Cypher \u21A6 React'}
              </Header.Content>
            </Header>

          </Container>
        </Segment>

        <Segment style={{
          padding: '8em 0em'
        }} vertical>
          <Grid container stackable verticalAlign='middle' columns={3} divided>
            <Grid.Row>
              <Grid.Column>
                <p>
                  This application connects to the active Neo4j graph and executes a cypher query on it every 3 secods and display its result in an ascii table.
                </p>
              </Grid.Column>
              <Grid.Column>
                <p>
                  It also picks up connection changes and executes queries over the new connection.
                </p>
              </Grid.Column>
              <Grid.Column>
                <p>This app only works for local connection without authentication, or remote connections.
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Render if={this.props.connected}>
                    <Cypher query="CALL dbms.queryJmx('org.neo4j:instance=kernel#0,name=Kernel') YIELD attributes
                RETURN attributes.StoreId.value as dbStoreId, attributes.DatabaseName.value as dbName, rand() as random1, rand() as random2" render={queryResultView} interval={3}/>
                </Render>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>


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
          <ConnectedApp key="app" connected={connectionState === CONNECTED} />
        ];
      }}
    />
  );
};

export default App;
