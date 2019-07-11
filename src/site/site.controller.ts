import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiImplicitQuery,
    ApiOkResponse,
    ApiOperation,
    ApiUseTags,
} from '@nestjs/swagger';
import { isArray, map } from 'lodash';
import { GetOperationId } from '../shared/utilities/get-operation-id.helper';
import { ApiException } from '../shared/api-exception.model';
import { Roles } from '../shared/decorators/roles.decorator';
import { UserRole } from '../user/models/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Site } from './models/site.model';
import { SiteService } from './site.service';
import { SiteDto } from './models/dto/site-dto.model';
import { CreateSiteDto } from './models/dto/create-site-dto.model';


@Controller('sites')
@ApiUseTags(Site.modelName)
@ApiBearerAuth()
export class SiteController {
    constructor(private readonly _siteService: SiteService){}

    @Post()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiCreatedResponse({ type: SiteDto })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId(Site.modelName, 'Create'))
    async create(@Body() params: CreateSiteDto): Promise<SiteDto> {
        try {
            const newSite = await this._siteService.createSite(params);
            return this._siteService.map<SiteDto>(newSite);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @Get()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiOkResponse({ type: SiteDto })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId(Site.modelName, 'GetAll'))
    @ApiImplicitQuery({ name: 'siteName', required: false })
    async get( @Query('siteName') siteName?: string ): Promise<SiteDto[]> {
        let filter = {};

        if (siteName) {
            filter['siteName'] = { $in: isArray(siteName) ? [...siteName] : [siteName] };
        }

        try {
            const sites = await this._siteService.findAll(filter);
            console.log('sites ', sites);
            return this._siteService.map<SiteDto[]>(map(sites, site => site.toJSON()));
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
