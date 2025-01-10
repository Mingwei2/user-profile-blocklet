import db from '../libs/database';

export default class UserService {
  static findById(id: string | undefined) {
    if (!id) return null;
    const query = 'SELECT * FROM users WHERE id = ?';
    return db.prepare(query).get(id);
  }
}
