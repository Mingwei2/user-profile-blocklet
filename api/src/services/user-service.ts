import { User } from '../../../types/user';
import db from '../libs/database';

export default class UserService {
  static findById(id: string | undefined): User | null {
    if (!id) return null;
    const query = 'SELECT * FROM users WHERE id = ?';
    return db.prepare(query).get(id) as User | null;
  }

  static update(id: string | undefined, data: Partial<User>): User | null {
    if (!id) return null;
    const query = 'UPDATE users SET name = ?, email = ?, phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    db.prepare(query).run(data.name, data.email, data.phone, id);
    return {
      id: Number(id),
      name: data.name,
      email: data.email,
      phone: data.phone,
      updated_at: new Date().toISOString(),
    };
  }
}
