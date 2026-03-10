import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './common/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ChildrenModule } from './children/children.module';
import { AssessmentModule } from './assessment/assessment.module';
import { MapModule } from './map/map.module';
import { DetectionModule } from './detection/detection.module';
import { TrainingModule } from './training/training.module';
import { SymptomsModule } from './symptoms/symptoms.module';
import { ReportModule } from './report/report.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ChildrenModule,
    AssessmentModule,
    MapModule,
    DetectionModule,
    TrainingModule,
    SymptomsModule,
    ReportModule,
    NotificationsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
