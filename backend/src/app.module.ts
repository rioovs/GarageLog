import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ServicesModule } from './services/services.module';
import { TaxesModule } from './taxes/taxes.module';

@Module({
  imports: [PrismaModule, AuthModule, VehiclesModule, ServicesModule, TaxesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
