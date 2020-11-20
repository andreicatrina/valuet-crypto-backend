import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './modules/configuration';
import { DatabaseConfigModule } from './modules/database-config/database.module';
import { TypeOrmDefaultConfigService } from './modules/database-config/database.providers';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      ignoreEnvVars: false,
      isGlobal: true,
      expandVariables: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useExisting: TypeOrmDefaultConfigService,
    }),
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}