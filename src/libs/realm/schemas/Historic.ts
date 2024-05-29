import Realm  from 'realm';

type GenerateProps = {
    user_id: string;
    description: string;
    license_plate: string;
}

export class Historic extends Realm.Object<Historic> {
    _id!: 'string';
    user_id!: 'string';
    license_plate!: 'string';
    description!: 'string';
    status!: 'string';
    create_at!: 'string';
    update_at!: 'string';

    static generate({ user_id, license_plate, description }: GenerateProps) {
        return {
            _id: new Realm.BSON.UUID(),
            user_id, 
            license_plate, 
            description,
            status: 'departure',
            create_at: new Date(),
            update_at: new Date()
        }
    }

    static schema = {
        name: 'Historic',
        primaryKey: '_id',

        properties: {
            _id: 'uuid',
            user_id: {
                type: 'string',
                indexed: true
            },
            license_plate: 'string',
            description: 'string',
            status: 'string',
            create_at: 'date',
            update_at: 'date'
        }
    }
}