# Changelog

### 29.10.2018

- Kerberos support introduced

### 19.07.2018

- Application online/offline introduced
    - `ApplicationOnlineEvent`
    - `ApplicationOfflineEvent`
- Graph app icons introduced
- Add possibility to specify release notes

### 20.10.2017

- Externally configured apps
    - `appId` field is now mandatory

### 16.10.2017

**Bump API Version:** 1.2.0

- Remote Connections introduced
  - `Graph.connection` can now be `GraphRemoteConnection`
  - Added `GraphRemoteConnection` type
  - Events:
    - `RemoteConnectionCreatedEvent`
    - `RemoteConnectionRemovedEvent`
    - `RemoteConnectionActivatedEvent`
    - `RemoteConnectionDeactivatedEvent`
- Graph active/inactive events introduced
  - `GraphActiveEvent`
  - `GraphInactiveEvent`

### 07.10.2017

**Bump API Version:** 1.1.0

- Add possibility to configure Graph Apps externally
- Non-backward `Context` changes
  - Remove `Project.description`
  - Added `GraphLocalConnection.databaseType`
  - Added `GraphLocalConnection.databaseStatus`
  - Removed `GraphLocalConnection.info.status`
  - Changed `GraphLocalConnection.configuration`
    - Added `protocols` with `both`, `http` and `https` values
- Added new action `DatabaseSettingsSaved`

### 05.10.2017

- Added `executeJava` function
