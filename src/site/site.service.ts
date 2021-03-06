import { HttpService, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { BaseService } from '../shared/base.service';
import { MapperService } from '../shared/mapper/mapper.service';
import { Site } from './models/site.model';
import { CreateSiteDto } from './models/dto/create-site-dto.model';

@Injectable()
export class SiteService extends BaseService<Site> {
    constructor(
        private readonly httpService: HttpService,
        @InjectModel(Site.modelName) private readonly _siteModel: ModelType<Site>,
        private readonly _mapperService: MapperService
    ) {
        super();
        this._model = _siteModel;
        this._mapper = _mapperService.mapper;
    }

    async createSite(params: CreateSiteDto): Promise<Site> {
        const { username, password, sitename, domainname } = params;

        const newItem = Site.createModel();
        newItem.username = username.trim().toLowerCase();
        newItem.sitename = sitename.trim().toLowerCase();
        newItem.domainname = domainname.trim().toLocaleLowerCase(); 

        const salt = await genSalt(10);
        newItem.password = await hash(password, salt);

        try {
            const result = await this.create(newItem);
            return result.toJSON() as Site;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}
