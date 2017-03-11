const Model = require('objection').Model;

export default class User_Url extends Model {
  // Table name like this is the only required property.
  static get tableName() {
    return 'User_Url';
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
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/User`,
        join: {
          from: 'User_Url.user_id',
          to: 'User.Id'
        }
      },

      urls: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/Url`,
        join: {
          from: 'User_Url.url_id',
          to: 'Url.Id'
        }
      }
    }
  }

}
