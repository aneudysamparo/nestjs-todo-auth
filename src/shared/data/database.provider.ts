import * as mongoose from 'mongoose';

export const databaseProvider = [
    {
        provide: 'HOST_DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect('')
    }
];