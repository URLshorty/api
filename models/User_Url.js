import { Model } from 'objection'

export default class User_Url extends Model {
  // Table name is the only required property.
  static get tableName() {
    // name of table in db
    return 'user_urls'
  }

  // Not the database schema! Only validation during
  // instantiation http://json-schema.org/
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'url_id'],
      properties: {
        id: {type: 'integer'},
        shortened: {type: 'string', minLength: 1, maxLength: 255},
        visits: {type: 'integer'},
        user_id: {type: ['integer', null]},
        url_id: {type: 'integer'},
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

  $beforeInsert() {
    this.created_at = new Date().toISOString()
    this.updated_at = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString()
  }

}
