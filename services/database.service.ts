import * as SQLite from 'expo-sqlite';
import { Place } from '../models/Place';
import { SQLError, SQLResultSet, SQLTransaction, WebSQLDatabase } from 'expo-sqlite';

const db: WebSQLDatabase = SQLite.openDatabase('places.db');

export const init = (): Promise<void> => {
    return new Promise(((resolve, reject) => {
        db.transaction(
            (transaction: SQLTransaction) => {
                transaction.executeSql(
                    'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL , lng REAL NOT NULL);',
                    [],
                    () => {
                        console.log('Database initialized');
                        resolve();
                    },
                    (transaction: SQLTransaction, error: SQLError) => {
                        console.log('Database fail to initialized', error);
                        reject(error);
                        return false;
                    }
                );
            }
        );
    }));
};

export const fetchPlaces = (): Promise<SQLResultSet> => {
    return new Promise(((resolve, reject) => {
        db.transaction(
            (transaction: SQLTransaction) => {
                transaction.executeSql(
                    'SELECT * FROM places',
                    [],
                    (transaction: SQLTransaction, resultSet: SQLResultSet) => {
                        resolve(resultSet);
                    },
                    (transaction: SQLTransaction, error: SQLError) => {
                        reject(error);
                        return false;
                    }
                );
            }
        );
    }));
}

export const insertPlace = (place: Place): Promise<SQLResultSet> => {
    return new Promise(((resolve, reject) => {
        db.transaction(
            (transaction: SQLTransaction) => {
                transaction.executeSql(
                    'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
                    [place.title, place.imageUri, place.address, place.lat, place.lng],
                    (transaction: SQLTransaction, resultSet: SQLResultSet) => {
                        resolve(resultSet);
                    },
                    (transaction: SQLTransaction, error: SQLError) => {
                        reject(error);
                        return false;
                    }
                );
            }
        );
    }));
};
