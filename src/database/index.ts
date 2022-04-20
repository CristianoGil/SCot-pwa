import {SQLite, SQLiteObject, SQLiteTransaction, DbTransaction} from '@awesome-cordova-plugins/sqlite';
import SQLiteDatabaseConfigData from '../config/database.config';


export default function database() {
    let db: SQLiteObject; //
    //
    // @ts-ignore
    const initialDatabase = async (): Promise<void> => {

            if (!db) { // If the db is already created, just ignore this👽
                try {
                    db = await SQLite.create(SQLiteDatabaseConfigData);
                    console.info("[SQLite: Success - Create] \n The database has been " + SQLiteDatabaseConfigData.name + " successfully create");
                } catch (e) {
                    console.error("[SQLite: Error - Create] \n", JSON.stringify(e));
                }
            } else {
                console.warn(`[SQLite: Info - Create] \n The database '${SQLiteDatabaseConfigData.name} is aleady existe'`)
            }
        },

        createTable = async (table: string, fields: string[]): Promise<void> => {
            const query = `CREATE TABLE IF NOT EXISTS
                           (
                               ${table} ${fields.join(',')}
                           )`;
            try {
                await db.addTransaction((tx: SQLiteTransaction) => {
                    tx.addStatement(query)
                })
                console.info("[SQLite: Success - createTable (" + table + ")] \n", query);
            } catch (e) {
                console.error("[SQLite: Error - createTable (" + table + ")] \n", JSON.stringify(e));
            }

        },

        insertOne = async (table: string, valuesRefQty: number, values: any[], fields?: string[]): Promise<void> => {
            if (fields?.length) {
                await createTable(table, fields);
            }

            const valuesRef = ('?,'.repeat(valuesRefQty)).slice(0, -1);
            const statement = `INSERT INTO ${table}
                               VALUES (${valuesRef})`;

            try {
                await db.addTransaction((tx: SQLiteTransaction) => {
                    tx.executeSql(statement, values);
                })
                console.info("[SQLite: Success - insertOne (" + table + ")] - statement: " + statement + " - values:", values);
            } catch (e) {
                console.error("[SQLite: Error - insertOne (" + table + ")] \n", JSON.stringify(e));
            }
        },

        fetch = async (query: string): Promise<any> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await db.addTransaction((tx: SQLiteTransaction) => {
                        console.log("Inside off tr")
                        tx.executeSql(query)
                        // tx.executeSql(query, undefined, function (_tx: any, rs: any) {
                        //     console.log(rs);
                        //     console.log('Record count (expected to be 2): ' + rs.rows.item);
                        //     resolve(rs);
                        // }, function (_tx: any, error: any) {
                        //     console.error('SELECT error: ', error.message);
                        //     reject(error.message);
                        // });
                    })
                    console.log("result: ", result)
                    resolve('Done out')
                } catch (e) {
                    reject(e)
                }
            })
        },

        _echoTest = async (): Promise<void> => {
            try {
                await SQLite.echoTest();
            } catch (e) {
                console.error("[SQLite: Error - self._echoTest] \n", JSON.stringify(e));
            }
        },
        _selfTest = async (): Promise<void> => {
            try {
                await SQLite.selfTest();
            } catch (e) {
                console.error("[SQLite: Error - self._selfTest] \n", JSON.stringify(e));
            }
        }

    return {
        initialDatabase,
        createTable,
        insertOne,
        fetch,
        self: {
            _echoTest,
            _selfTest
        }
    }
};
