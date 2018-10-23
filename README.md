# Neo4j Desktop Graph App API

To give a 3rd party applications the possibility to know,
what active graph is and where it is contained, we provide a context.

First of all, context expose to the apps all data, that could be viable for them to operate -
configurations, projects, graphs.

Context itself is an immutable structure which is generated on demand,
but all context changes are interceptable, so the apps could react to context changes immediately.

Check out [Changelog](CHANGELOG.md) to follow API changes.

## Development mode

Neo4j Desktop have `Development mode`.

To enable it, open `Settings` pane in Sidebar and toggle switch in `Developer tools` section.

### Development mode settings

When development mode is enabled, additional app is added to the list of other apps: `Development App`.

Developer needs to setup entry point and application root directory for Graph App in settings.

Settings:

* Entry Point
  * Supported formats:
      * File: load `.html` file directly from filesystem
        * Example: `file:///Users/me/work/graph-app/index.html`
      * HTTP: load arbitrary `URL`
        * Example: `http://localhost:3000`
* Root Path
    * Example: `/Users/me/work/graph-app`

**Note:** settings are not saved between Neo4j Desktop restarts.

![Developer Tools](developmentMode.png)

## Example

Available examples:

- [Simple single file Graph Application](examples/basic-single-file)
- [Simple application created with create-react-app](examples/basic-create-react-app)
- [Simple application executing Java](examples/basic-java-executor)

#### Quickstart example

```js
/**
 * If application can run in multiple environments, detect that we are in Desktop.
 */
if (window.neo4jDesktopApi) {
    // API will be available in global `window` variable `neo4jDesktopApi`.


    // Listen for context changes
    neo4jDesktopApi.onContextUpdate((event, newContext, oldContext) => {
        if (event.type === '...') {
            // do something if event is of specific type
        }

       // check context changes and apply them
    });

    // Get current context.
    // Should be used if application requires current context when it starts.
    neo4jDesktopApi.getContext()
        .then((context) => {
            // initialize application with context
        });   
}
```

## Distribution

### Structure
Graph applications should be distributed as a valid [npm package file](https://docs.npmjs.com/files/package.json),
where `dist` folder contains a default app entry point `index.html`.

### Installation
To installa a self updating graph application, you enter a link to a npm style repository for the graph application.  
Example for neo4j-browser: `http://neo.jfrog.io/neo/api/npm/npm/neo4j-browser`.  
This application will self update on every release (see below for how to display release notes).

or

Pack and upload a `.tgz` file (following the structure explained above) and enter the URL to it in the graph application sidebar. This will be downloaded once and never updated.

or

Host a web application yourself and "install" it by inserting the URL to it in the graph application sidebar.


### Neo4j Desktop API version support
Manifest file `manifest.json` should be placed in `/dist` folder and contain information about the Graph App. Including Neo4j Desktop API version that is used.
*Note:* You can either specify explicit `apiVersion` or semver range.

The fallback is using the `package.json` file if no manifest file is found.

Example:

```json
{
    "name": "my-graph-app",
    "version": "1.0.0",
    "description": "(desktop)-[:LOVES]->(apps)",
    "homepage": "http://neo4j.com",
    "neo4jDesktop": {
        "apiVersion": "^1.2.0"
    }
}
```

### Graph application metadata

**For packages graph applications**

Neo4j Desktop scans `manifest.json` for the fields `neo4jDesktop`, `name`, `description`, `icons`, and `homepage` to show the values of these fields 
on the UI.  
To customize the look of the graph app inside Neo4j Desktop - include an icon to the distribution and add `icons`
property to the `manifest.json`.

*Note:* The paths should be relative to the location of the manifest file where they are specified:
- If they are specified in `package.json`, their src should be relative to the graph app root. 
- If they are specified in `dist/manifest.json` their src should be relative to the `dist/` folder.

Icon type could be any image type, or inline data URI.
Example:
```json
{
    "name": "my-graph-app",
    "description": "(desktop)-[:LOVES]->(apps)",
    "icons": [
        {
          "src": "./my-image.png",
          "type": "png"
        },{
          "src": "./my-vector-image.svg",
          "type": "svg"
        },{
          "src": "data:image/svg+xml;base64,[data]",
          "type": "data"
        }
    ]
}
```

**For online/hosted graph applications**

Neo4j Desktop looks for a `manifest.json` in the web root and look for a `<name>` tag to derive graph app name. The icon will be fetched from the `<link rel="icon">` tag if it exists.

The fallback is using the documents `<title>` tag if no manifest file is found.

### Graph application release notes on updates
Include `release-notes.md` on the same level as `package.json` to have Neo4j Desktop display your applications release notes when it's updated.

**Notes:**

- Ensure that `neo4jDesktop.apiVersion` is properly configured.
- Ensure that package have proper structure.

## Technical details

#### Application data location

| OS | Location |
|----|----------|
| macOS | ~/Library/Application Support/Neo4j Desktop |
| Windows pre 1.0.19 | %APPDATA%/Neo4j Desktop |
| Windows post 1.0.19 | %USERPROFILE%/.Neo4jDesktop |
| Linux | ~/.config/Neo4j Desktop |

## Reference

*Note:* API is under development and it can be changed, based on user feedback.

*Note:* API definition is presented using [Flow](flow.org) syntax.

```js
// Types are defined using Flow syntax.

window.neo4jDesktopApi = {
    /**
     * Asynchronously get current context.
     */
    getContext: () => Promise<Context>,

    /**
     * Register callback to receive context updates when events are happening.
     */
    onContextUpdate: (event: Event, newContext: Context, oldContext: Context) => void,

    /**
     *  Execute any jar, bundled inside you app package or given path. Will return wrapped process with API provided
     */
    executeJava: (parameters: JavaParameters) => Promise<Process>,

    /**
     *  Execute any node script, bundled inside you app package or given path. Will return wrapped process with API provided
     */
    executeNode: (filePath: string, args: Array<string>, options: ExecOptions): Promise<Process>
};

//---------------
// Java
//---------------

export type JavaParameters = {
    /**
     * Specify class or jar that should be executed.
     * Path to a .jar file can either be relative to App Path or absolute.
     * Example: 'Main'
     * Example: './test.jar'
     */
    ['class' | 'jar']: string,

    /**
     * JVM arguments.
     * Example: ['-DmyProperty=value', '-Xdebug']
     */
    options: string[],

    /**
     * Jar's that will be added to classpath.
     * Example: ['./test.jar', '/opt/lib/test.jar']
     */
    classpath: string[],

    /**
     * Argument passed to a main.
     * Example: ['one', 'two', 'three']
     */
    arguments: string[]
}

type ProcessStatus =
    | 'RUNNING'
    | 'STOPPED'
    | 'KILLED'
    ;

export type Process = {
    /**
     * Stop the process tree gracefully, if fails - kill the process tree forcefully
     */
    stop(): Promise<boolean>;

    /**
     * Get the actual status of the process
     */
    status(): Promise<ProcessStatus>;

    /**
     * Get the list of PIDs for whole process tree
     */
    getProcessTreeIds(): Promise<Array<number>>;

    /**
     * Listen to process-related errors (e.g. not being able to start)
     */
    onError(listener: (error: Error) => void): void;

    /**
     * Listen to process exit event. Provides the status which was assigned the last.
     */
    onExit(listener: (status: ProcessStatus) => void): void;

    /**
     * Attach to the stdout stream
     */
    addOutListener(listener: (data: string) => void): void;

    /**
     * Attach to the stderr stream
     */
    addErrListener(listener: (errData: string) => void): void;
}

//---------------
// Node
//---------------

type EnvOptions = {
    [key: string]: string
}

type ExecOptions = {
    cwd?: string,
    env?: EnvOptions
}

//---------------
// Context
//---------------

export type Context = {
    global: {
        online: boolean
        settings: Settings
    },
    projects: Array<Project>
};

type Settings = {
    allowSendStats: boolean,
    allowSendReports: boolean
};

type Project = {
    id: string,
    name: string,
    graphs: Array<Graph>
};

type Graph = {
    id: string,
    name: string,
    description: string,
    status: 'ACTIVE' | 'INACTIVE',
    connection: GraphLocalConnection | GraphRemoteConnection
};

type GraphLocalConnection = {
    type: 'LOCAL',
    databaseType: 'neo4j',
    databaseStatus: GraphLocalConnectionStatus,
    info: {
        version: string,
        edition: string
    },
    configuration: {
        path: string,
        protocols: {
            bolt: {
                enabled: boolean,
                host: string,
                port: number,
                tlsLevel: 'OPTIONAL' | 'REQUIRED' | 'DISABLED'
            },
            http: {
                enabled: boolean,
                host: string,
                port: number
            },
            https: {
                enabled: boolean,
                host: string,
                port: number
            }
        }
    }
};

type GraphLocalConnectionStatus =
    | 'STOPPED'
    | 'STOPPING'
    | 'STARTING'
    | 'RESTARTING'
    | 'RUNNING'
    | 'UNKNOWN'
    | 'NEW'
    | 'CREATING'
    | 'REMOVING'
    | 'UPGRADING'
    | 'MISSING'
    ;

type GraphRemoteConnection = {
    type: 'REMOTE',
    databaseType: 'neo4j',
    databaseStatus: GraphRemoteConnectionStatus,
    info: {
        version: 'UNKNOWN' | string,
        edition: 'UNKNOWN' | string
    },
    configuration: {
        protocols: {
            bolt: {
                enabled: boolean,
                host: string,
                port: number,
                tlsLevel: 'OPTIONAL' | 'REQUIRED' | 'DISABLED',
                username?: string,
                password?: string
            }
        }
    }
}

type GraphRemoteConnectionStatus =
    | 'UNKNOWN'
    | 'NEW'
    | 'CREATING'
    | 'REMOVING'
    | 'ACTIVATING'
    | 'AVAILABLE'
    | 'NOT_AVAILABLE'
    | 'DEACTIVATING'
    | 'DEACTIVATED'
    ;

//---------------
// Events
//---------------

type Event =
    | ApplicationOnlineEvent
    | ApplicationOfflineEvent
    | ProjectCreatedEvent
    | ProjectRemovedEvent
    | ProjectRenamedEvent
    | GraphActiveEvent
    | GraphInactiveEvent
    | DatabaseCreatedEvent
    | DatabaseStartedEvent
    | DatabaseStoppedEvent
    | DatabaseRenamedEvent
    | DatabaseRemovedEvent
    | DatabaseUpdatedEvent
    | DatabaseUpgradedEvent
    | DatabaseSettingsSavedEvent
    | RemoteConnectionCreatedEvent
    | RemoteConnectionRemovedEvent
    | RemoteConnectionActivatedEvent
    | RemoteConnectionDeactivatedEvent
;

type ApplicationOnlineEvent = {
    type: 'APPLICATION_ONLINE'
}

type ApplicationOfflineEvent = {
    type: 'APPLICATION_OFFLINE'
}

type ProjectCreatedEvent = {
    type: 'PROJECT_CREATED',
    id: string,
    name: string
}

type ProjectRemovedEvent = {
    type: 'PROJECT_REMOVED',
    id: string
}

type ProjectRenamedEvent = {
    type: 'PROJECT_RENAMED',
    id: string,
    name: string
}

type GraphActiveEvent = {
    type: 'GRAPH_ACTIVE',
    id: string
}

type GraphInactiveEvent = {
    type: 'GRAPH_INACTIVE',
    id: string
}

type DatabaseCreatedEvent = {
    type: 'DATABASE_CREATED',
    id: string,
    projectId: string,
    name: string,
    description: string,
    status: GraphLocalConnectionStatus,
    version: string,
    edition: 'community' | 'enterprise'
};

type DatabaseStartedEvent = {
    type: 'DATABASE_STARTED',
    id: string
};

type DatabaseStoppedEvent = {
    type: 'DATABASE_STOPPED',
    id: string
};

type DatabaseRenamedEvent = {
    type: 'DATABASE_RENAMED',
    id: string,
    name: string
};

type DatabaseRemovedEvent = {
    type: 'DATABASE_REMOVED',
    id: string
};

type DatabaseUpdatedEvent = {
    type: 'DATABASE_UPDATED',
    id: string,
    database: {
        description: string
    }
};

type DatabaseUpgradedEvent = {
    type: 'DATABASE_UPGRADED',
    id: string,
    version: string
};

type DatabaseSettingsSavedEvent = {
    type: 'DATABASE_SETTINGS_SAVED',
    id: string
};

type RemoteConnectionCreatedEvent = {
    type: 'REMOTE_CONNECTION_CREATED',
    id: string
}

type RemoteConnectionRemovedEvent = {
    type: 'REMOTE_CONNECTION_REMOVED',
    id: string
}

type RemoteConnectionActivatedEvent = {
    type: 'REMOTE_CONNECTION_ACTIVATED',
    id: string
}

type RemoteConnectionDeactivatedEvent = {
    type: 'REMOTE_CONNECTION_DEACTIVATED',
    id: string
}
```
