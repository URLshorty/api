import { Model } from 'objection'

export default class User_Url extends Model {
  // Table name is the only required property.
  static get tableName() {
    // name of table in db
    return 'user_urls';
  }

  // This is not the database schema! Nothing is This is only used for
  // validation. Whenever a model instance is created it is checked against
  // this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'passwordDigest'],
      properties: {
        id: {type: 'integer'},
        user_id: {type: 'string', minLength: 1, maxLength: 50},
        url_id: {type: 'string', minLength: 1, maxLength: 80},
        password_digest: {type: 'integer'},
        created_at: {type: 'string'},
        updated_at: {type: 'string'}
      }
    }
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/User`,
        join: {
          from: 'user_urls.user_id',
          to: 'users.id'
        }
      },

      urls: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Url`,
        join: {
          from: 'user_urls.url_id',
          to: 'urls.id'
        }
      }
    }
  }

}
