import { Model } from 'objection'

export default class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    // name of table in db
    return 'users';
  }

  // This is not the database schema! Nothing is This is only used for
  // validation. Whenever a model instance is created it is checked against
  // this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'password_digest'],
      properties: {
        id: {type: 'integer'},
        username: {type: 'string', minLength: 1, maxLength: 50},
        email: {type: 'string', minLength: 1, maxLength: 80},
        password_digest: {type: 'string'},
        is_admin: {type: 'integer'},
        most_visited_url_id: {type: 'integer'},
        created_at: {type: 'string'},
        updated_at: {type: 'string'}
      }
    }
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      urls: {
        relation: Model.ManyToManyRelation,
        // model class of final destination table, not immediate join!
        modelClass: `${__dirname}/Url`,
        join: {
          from: 'users.id',
          through: {
            from: 'user_urls.user_id',
            to: 'user_urls.url_id'
          },
          to: 'urls.id'
        }
      },

      url: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Url`,
        join: {
          from: 'users.most_visited_url_id',
          to: 'urls.id'
        }
      }
    }
  }

  // look into a transaction for these
  static async create(userHash) {
    let promReturn = 'error at user#create'
    await
      this
        .query()
        .insert(userHash)
        .then((newUser) => {
          console.log(`new user ${newUser.username} created`)
          promReturn = newUser
        })
        .catch((er) => {
          console.log(er)
          promReturn = promReturn + ": " + er
        })
    return promReturn
  }

  async createUrl(url) {
    let promReturn = 'error at user#createUrl'
    await
      this
        .$relatedQuery('urls')
        .insert({address: url})
        .then((newUrl) => {
          console.log(`${this.username} created ${newUrl.original}`)
          promReturn = newUrl
        })
        .catch((er) => {
          console.log(er)
          promReturn = promReturn + ": " + er
        })
    return promReturn
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString()
    this.updated_at = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString()
  }

}
