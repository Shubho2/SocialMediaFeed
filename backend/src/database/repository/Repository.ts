export interface Repository<T> {

    // create a new object in the database
    create(object: T): Promise<T>;

    // find an object from the database
    find(_id: string): Promise<T | null>;

    // delete an object from the database
    delete(_id: string): Promise<void>;

    // get all objects from the database
    findAll(): Promise<T[]>;

    // update an object in the database
    update(_id: string, object: T): Promise<T | null>;
}