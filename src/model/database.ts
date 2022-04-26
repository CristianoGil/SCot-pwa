import {SQLiteDatabaseConfig} from '@awesome-cordova-plugins/sqlite';

export interface SQLiteDatabaseConfigGlobal extends SQLiteDatabaseConfig {
    androidDatabaseProvider?: string, // Values: default / system
}