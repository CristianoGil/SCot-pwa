import type {SQLiteDatabaseConfigGlobal} from '../model/database';


const config: SQLiteDatabaseConfigGlobal = {
    /**
     * Name of the database. Example: 'my.db'
     */
    name: "scot.db", // required
    /**
     * Location of the database. Example: 'default'
     */
    location: 'default', // Optional
    /**
     * iOS Database Location. Example: 'Library'
     */
    // iosDatabaseLocation: 'default',  // Optional
    /**
     * support arbitrary database location on android with https://github.com/litehelpers/cordova-sqlite-evcore-extbuild-free
     */
    // androidDatabaseLocation: 'default', // Optional
    androidDatabaseProvider: 'system',
    /**
     * support opening pre-filled databases with https://github.com/litehelpers/cordova-sqlite-ext
     */
    // createFromLocation: number, // Optional
    /**
     * support encrypted databases with https://github.com/litehelpers/Cordova-sqlcipher-adapter
     */
    // key: string // Optional
}

export default config;