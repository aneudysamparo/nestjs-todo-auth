import { InstanceType, ModelType, prop } from 'typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';

export class Site extends BaseModel<Site> {
    @prop({
        required: [true, 'Site Name is required'],
        minlength: [4, 'Must be at least 4 characters'],
    })
    sitename: string;

    @prop({
        required: [true, 'Domain Name is required'],
        minlength: [2, 'Must be at least 2 characters'],
    })
    domainname: string;
    
    @prop({
        required: [true, 'Username is required'],
        minlength: [6, 'Must be at least 6 characters'],
    })
    username: string;

    @prop({
        required: [true, 'Password is required'],
        unique: true,
        minlength: [6, 'Must be at least 6 characters'],
    })
    password: string;

    static get model(): ModelType<Site> {
        return new Site().getModelForClass(Site, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }

    static createModel(): InstanceType<Site> {
        return new this.model();
    }
}