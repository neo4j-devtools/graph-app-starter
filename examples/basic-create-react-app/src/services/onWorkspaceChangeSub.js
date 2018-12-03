import gql from "graphql-tag";

export default gql`
    subscription {
        onWorkspaceChange {
            activationKeys {
                featureName
                expirationDate
            }
            general {
                online
                settings {
                    allowSendReports
                    allowSendStats
                    allowStoreCredentials
                }
            }
            projects {
                id
                name
                graphs {
                    id
                    name
                    status
                    connection {
                        ... on GraphLocalConnection {
                            type
                            databaseType
                            databaseStatus
                            info {
                                edition
                                version
                            }
                            configuration {
                                path
                                protocols {
                                    bolt {
                                        enabled
                                        host
                                        password
                                        port
                                        tlsLevel
                                        url
                                        username
                                    }
                                    http {
                                        enabled
                                        host
                                        port
                                        url
                                    }
                                    https {
                                        enabled
                                        host
                                        port
                                        url
                                    }
                                }
                            }
                        }
                        ... on GraphRemoteConnection {
                            type
                            databaseType
                            remoteStatus: databaseStatus
                            info {
                                edition
                                version
                            }
                            configuration {
                                protocols {
                                    bolt {
                                        enabled
                                        host
                                        password
                                        port
                                        tlsLevel
                                        url
                                        username
                                    }
                                    http {
                                        enabled
                                        host
                                        port
                                        url
                                    }
                                    https {
                                        enabled
                                        host
                                        port
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;