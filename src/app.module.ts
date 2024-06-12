import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { BaseEntityService } from './utils/base_entity/base_entity.service';
import * as process from "node:process";
import { User } from './user/entities/user.entity';
import { UtilsServiceService } from './utils/utils_service/utils_service.service';
import { ArtistModule } from './artist/artist.module';
import { GroupModule } from './group/group.module';
import { Artist } from './artist/entities/artist.entity';
import { Group } from './group/entities/group.entity';
import { AlbumModule } from './album/album.module';
import { InclusionModule } from './inclusion/inclusion.module';
import { Album } from './album/entities/album.entity';
import { Inclusion } from './inclusion/entities/inclusion.entity';
import { OwnedAlbum } from './album/entities/owned-album.entity';
import { OwnedInclusion } from './inclusion/entities/owned-inclusion.entity';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/entities/tag.entity';
import { Post } from './post/entities/post.entity';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { UserGuard } from './user/user.guard';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'nnz.h.filess.io',
      port: 3307,
      username: 'pfetest_arrangegun',
      password: '5b88e152f1e8a7b1d5f45b98c48d155bc6980af3',
      database: 'pfetest_arrangegun',
      entities: [
        User,
        Artist,
        Group,
        Album,
        OwnedAlbum,
        Inclusion,
        OwnedInclusion,
        Tag,
        Post
      ],
      synchronize: true,
    }),
    UserModule,
    ArtistModule,
    GroupModule,
    AlbumModule,
    InclusionModule,
    PostModule,
    TagModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService, 
    BaseEntityService, 
    UtilsServiceService,
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    }
  ],
})
export class AppModule {}
