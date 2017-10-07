# Changelog

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
