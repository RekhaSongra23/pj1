import { SetMetadata } from '@nestjs/common/decorators/core/set-metadata.decorator';
import { UserRole } from 'src/users/createUserDto';

export const UserRoles = (...roles: UserRole[]) => SetMetadata('roles', roles);
