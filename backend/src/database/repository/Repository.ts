import mongoose from 'mongoose';
export abstract class Repository<T> {

    constructor() {
        if (!process.env.CONNECTION_URI) {
            throw new Error('Database connection URI is not set');
        }
        if(![1,2].includes(mongoose.connection.readyState)) {
            mongoose.connect(process.env.CONNECTION_URI)
                .then(() => console.log('Connected to the database'))
                .catch((error) => console.log(error.message));
        }
    }

    /**
     * 
     * @param _id to be validated.
     * @returns true if the _id is valid, false otherwise.
     */
    isValid(_id: string): boolean {
        return mongoose.Types.ObjectId.isValid(_id);
    }

    // create a new object in the database
    abstract create(object: T): Promise<T>;

    // find an object from the database
    abstract find(_id: string): Promise<T | null>;

    // delete an object from the database
    abstract delete(_id: string): Promise<void>;

    // get all objects from the database
    abstract findAll(): Promise<T[]>;

    // update an object in the database
    abstract update(_id: string, object: T): Promise<T | null>;
}