import SQLiteDatabaseConfigData from '../config/database.config';


export default function database() {
    // @ts-ignore
    const sqlitePlugin = window?.sqlitePlugin;
    let db: any;

    /**
     * Open a database access handle object.
     */
    const initialDatabase = (): Promise<void> => {
            return new Promise((resolve, reject): void => {
                if (sqlitePlugin) {
                    if (!db) { // If the db is already created, just ignore this👽
                        db = sqlitePlugin.openDatabase(SQLiteDatabaseConfigData, () => {
                            console.info(`[SQLite: opened database] - ${SQLiteDatabaseConfigData.name} `)
                            resolve()
                        }, (e: any) => {
                            console.error(`[SQLite: open database error] - ${SQLiteDatabaseConfigData.name} \n`, JSON.stringify(e))
                            reject(e)
                        })
                    } else {
                        console.warn(`[SQLite: Info - Create] \n The database '${SQLiteDatabaseConfigData.name} is aleady existe'`)
                        resolve()
                    }
                } else {
                    reject('Plugin sqliteplugin not found')
                }

            })

        },

        createTable = (table: string, fields: string[]): Promise<void> => {

            return new Promise(async (resolve, reject): Promise<void> => {
                try {

                    if (!db) {
                        await initialDatabase();
                    }

                    const query = `CREATE TABLE IF NOT EXISTS ${table}
                                   (
                                       ${fields.join(',')}
                                   )`;

                    db.transaction((tx: any): void => {
                        tx.executeSql(query);
                    }, (error: any) => {
                        console.error("SQLite: Transaction create table error (" + table + ")\n", error.message);
                        reject(error)
                    }, () => {
                        console.info("SQLite: Transaction create table success (" + table + ")");
                        resolve()
                    });

                } catch (e) {
                    console.error("[SQLite: create table error (" + table + ")] \n", JSON.stringify(e));
                    reject(e)
                }

            })

        },

        insertOne = (table: string, valuesRefQty: number, values: any[], fields?: string[]): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    if (fields?.length) {
                        await createTable(table, fields);
                    } else {
                        if (!db) {
                            await initialDatabase();
                        }
                    }

                    const valuesRef = ('?,'.repeat(valuesRefQty)).slice(0, -1);
                    const statement = `INSERT INTO ${table}
                                       VALUES (${valuesRef})`;

                    db.transaction((tx: any): void => {
                        tx.executeSql(statement, values);
                    }, (error: any) => {
                        console.error("SQLite: Transaction populate table error (" + table + ")\n", error.message);
                        reject(error)
                    }, () => {
                        console.info("SQLite: Transaction populate table success (" + table + ")");
                        resolve()
                    });
                } catch (e) {
                    console.error("SQLite: Transaction populate table (" + table + ") error \n", JSON.stringify(e));
                    reject(e)
                }
            })

        },

        update = async (table: string, set: string, where: string): Promise<any> => {

            return new Promise<void>(async (resolve, reject) => {
                try {
                    if (!db) {
                        await initialDatabase();
                    }
                    
                    const statement = `UPDATE ${table} SET ${set} WHERE ${where}`

                    db.transaction((tx: any): void => {
                        tx.executeSql(statement);
                    }, (error: any) => {
                        console.error("SQLite: Transaction update table error (" + table + ")\n", error.message);
                        reject(error)
                    }, () => {
                        console.info("SQLite: Transaction update table success (" + table + ")");
                        resolve()
                    });
                } catch (e) {
                    console.error("SQLite: Transaction update table (" + table + ") error \n", JSON.stringify(e));
                    reject(e)
                }
            })
        },

        insertUpdate = async (table: string, valuesRefQty: number, values: any[], fields?: string[]): Promise<void> => {

            await dropTable(table);
            await insertOne(table, valuesRefQty, values, fields);

        },

        dropTable = (table: string): Promise<void> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const statement = `DROP TABLE IF EXISTS ${table}`;

                    if (!db) {
                        await initialDatabase();
                    }

                    db.transaction((tx: any): void => {
                        tx.executeSql(statement);
                    }, (error: any) => {
                        console.warn("SQLite: Transaction drop table error (" + table + ")\n", error.message);
                        reject(error)
                    }, () => {
                        console.info("SQLite: Transaction drop table success (" + table + ")");
                        resolve();
                    });
                } catch (e) {
                    console.error("SQLite: Transaction drop table (" + table + ") error \n", JSON.stringify(e));
                    reject(e)
                }
            })
        },

        fetch = async (query: string): Promise<any> => {
            return new Promise(async (resolve, reject) => {
                try {
                    if (!db) {
                        reject('Instance database is empty')
                    }

                    db.transaction((tx: any): void => {
                        tx.executeSql(query, [], (tx: any, rs: any) => {
                            console.log(rs.rows.item(0))
                            resolve(rs)
                        }, (tx: any, error: any) => {
                            console.log('SQLite: Transaction SELECT error: ' + error.message);
                            reject(error)
                        });
                    });


                } catch (e) {
                    reject(e)
                }
            })
        },

        /**
         * Verify that both the Javascript and native part of this plugin are installed in your application.
         */
        _echoTest = async (): Promise<void> => {
            sqlitePlugin.echoTest(() => {
                console.info('[SQLite: Success - self.echoTest]')
            }, (error: any) => {
                console.error("[SQLite: Error - self.echoTest] \n", JSON.stringify(error));
            });
        },
        /**
         * Verify that this plugin is able to open a database, execute the CRUD (create, read, update, and delete) operations, and clean it up properly.
         */
        _selfTest = (): void => {

            sqlitePlugin.selfTest(() => {
                console.info('[SQLite: Success - self._selfTest]')
            }, (error: any) => {
                console.error("[SQLite: Error - self._selfTest] \n", JSON.stringify(error));
            });

        }

    return {
        initialDatabase,
        createTable,
        insertOne,
        dropTable,
        insertUpdate,
        fetch,
        update,
        self: {
            _echoTest,
            _selfTest
        }
    }
};
