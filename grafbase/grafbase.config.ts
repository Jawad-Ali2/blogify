import { g, auth, config } from '@grafbase/sdk'
import bcrypt from 'bcrypt'


//@ts-ignore
const User = g.model('User', {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  password: g.string(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  posts: g.relation(() => Post).list().optional(),
}).auth((rules) => {
  rules.public().read();
});

//@ts-ignore
const Post = g.model('Post', {
  title: g.string().length({ min: 2, max: 50 }),
  description: g.string(),
  image: g.url(),
  category: g.string().search(),
  createdBy: g.relation(() => User),
  createdOn: g.timestamp(),
  likes: g.relation(() => User).list().optional(),
  comments: g.relation(() => Comment).list().optional(),
  tags: g.relation(() => Tag).list().optional(),
}).auth((rules) => {
  rules.public().read(),
    rules.private().create().delete().update();
});

//@ts-ignore
const Comment = g.model('Comment', {
  content: g.string(),
  createdBy: g.relation(() => User),
  createdOn: g.timestamp(),
}).auth((rules) => {
  rules.private().create().delete().update();
});

//@ts-ignore
const Tag = g.model('Tag', {
  name: g.string().unique(),
}).auth((rules) => {
  rules.public().read();
});

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('NEXTAUTH_SECRET'),
});

const hooks = {
  createUser: async (user: any) => {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    // Update the user object with the hashed password
    user.password = hashedPassword;
    return user;
  },
};

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private(),
  },
  ...hooks,
});
