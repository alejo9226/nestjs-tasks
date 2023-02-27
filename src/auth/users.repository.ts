import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';

export class UsersRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    console.log('consto', authCredentialsDto);
    const { username, password } = authCredentialsDto;

    const user = this.create({ username, password });

    await this.save(user);
  }
}
