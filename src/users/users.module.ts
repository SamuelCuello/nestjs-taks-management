import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: (configService:ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions:{
        expiresIn: 3600,
        }
      })

      
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports:[JwtStrategy, PassportModule]
})
export class UsersModule { }
