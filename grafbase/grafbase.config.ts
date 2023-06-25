import { g, auth, config } from '@grafbase/sdk'


const User = g.model('User', {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  posts: g.relation(() => Post).list().optional(),
  
})

const Post = g.model('Post', {
  title: g.string().length({ min: 2, max: 50 }),
  description: g.string(),
  image: g.url(),
  category: g.string().search(),
  createdBy: g.relation(() => User),
  createdOn: g.timestamp(),
})


export default config({
  schema: g

})
