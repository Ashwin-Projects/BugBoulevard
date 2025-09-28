// Minimal in-memory models to allow the API to run without a real DB.
// This is for development/demo only.

export type ObjectId = string;

let nextId = 1;
function oid(): ObjectId {
  return String(nextId++);
}

// User model
export class User {
  static data: User[] = [];
  _id: ObjectId;
  username: string;
  email?: string;
  passwordHash?: string;

  constructor(init: Partial<User> & { username: string; email?: string; passwordHash?: string }) {
    this._id = oid();
    this.username = init.username;
    this.email = init.email;
    this.passwordHash = init.passwordHash;
  }

  async save() {
    User.data.push(this);
    return this;
  }

  static async findOne(q: any): Promise<User | null> {
    if (q?.$or?.length) {
      const [a, b] = q.$or;
      const u = User.data.find(
        (x) => (a.username && x.username === a.username) || (b?.email && x.email === b.email)
      );
      return u || null;
    }
    if (q?.username) return User.data.find((x) => x.username === q.username) || null;
    if (q?.email) return User.data.find((x) => x.email === q.email) || null;
    return null;
  }
}

// Score model
export class Score {
  static data: Score[] = [];
  _id: ObjectId;
  userId: ObjectId;
  points: number;
  createdAt: Date;

  constructor(init: { userId: ObjectId; points: number }) {
    this._id = oid();
    this.userId = init.userId;
    this.points = init.points;
    this.createdAt = new Date();
  }

  async save() {
    Score.data.push(this);
    return this;
  }

  static find() {
    // Simple chainable query API used by routes
    let arr = [...Score.data];
    const api = {
      populate(field: string, _proj?: string) {
        if (field === 'userId') {
          arr = arr.map((s) => ({
            ...s,
            userId: User.data.find((u) => u._id === s.userId) || { _id: s.userId, username: 'unknown' },
          })) as any;
        }
        return api;
      },
      sort(spec: Record<string, 1 | -1>) {
        const [[key, dir]] = Object.entries(spec);
        arr.sort((a: any, b: any) => (dir === -1 ? b[key] - a[key] : a[key] - b[key]));
        return api;
      },
      limit(n: number) {
        arr = arr.slice(0, n);
        return api;
      },
      lean() {
        return arr as any;
      },
    };
    return api;
  }
}

// Game model
export class Game {
  static data: Game[] = [];
  _id: ObjectId;
  mode: string;
  maxPlayers: number;
  status: 'waiting' | 'active' | 'finished';
  players: ObjectId[];
  createdAt: Date;

  constructor(init: { mode: string; maxPlayers: number; status?: 'waiting' | 'active' | 'finished'; players?: ObjectId[] }) {
    this._id = oid();
    this.mode = init.mode;
    this.maxPlayers = init.maxPlayers;
    this.status = init.status ?? 'waiting';
    this.players = init.players ?? [];
    this.createdAt = new Date();
  }

  async save() {
    const idx = Game.data.findIndex((g) => g._id === this._id);
    if (idx === -1) Game.data.push(this);
    else Game.data[idx] = this;
    return this;
  }

  static async findById(id: ObjectId): Promise<Game | null> {
    return Game.data.find((g) => g._id === id) || null;
  }

  static find(q?: any) {
    let arr = [...Game.data];
    if (q?.status) arr = arr.filter((g) => g.status === q.status);
    const api = {
      populate(field: string, _proj?: string) {
        if (field === 'players') {
          arr = arr.map((g) => ({
            ...g,
            players: g.players.map((id) => User.data.find((u) => u._id === id) || { _id: id, username: 'unknown' }),
          })) as any;
        }
        return api;
      },
      lean() {
        return arr as any;
      },
    };
    return api;
  }
}