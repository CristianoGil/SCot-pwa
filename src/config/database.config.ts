import {SQLiteDatabaseConfig} from '@awesome-cordova-plugins/sqlite';

const config = {
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
    // androidDatabaseLocation: 'system', // Optional
    /**
     * support opening pre-filled databases with https://github.com/litehelpers/cordova-sqlite-ext
     */
    // createFromLocation: number, // Optional
    /**
     * support encrypted databases with https://github.com/litehelpers/Cordova-sqlcipher-adapter
     */
    // key: string // Optional
}

export default config as unknown as SQLiteDatabaseConfig;