import db from '../libs/database';
import { User } from '../types/user.type';

export default class UserService {
  static findById(id: string | undefined): User | null {
    if (!id) return null;
    const query = 'SELECT * FROM users WHERE id = ?';
    return db.prepare(query).get(id) as User | null;
  }
}
