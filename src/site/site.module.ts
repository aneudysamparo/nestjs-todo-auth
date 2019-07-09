import { Module, HttpModule } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Site } from './models/site.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Site.modelName, schema: Site.model.schema }]), HttpModule],
  controllers: [SiteController],
  providers: [SiteService]
})
export class SiteModule {}
