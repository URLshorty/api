const Model = require('objection').Model

export default class Url extends Model {
  // Table name like this is the only required property.
  static get tableName() {
    return 'Url';
  }

  // This is not the database schema! Nothing is This is only used for
  // validation. Whenever a model instance is created it is checked against 
  // this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['original'],
      properties: {
        id: {type: 'integer'},
        original: {type: 'string', minLength: 1},
        shortened: {type: 'string', minLength: 1, maxLength: 255},
        requests: {type: 'integer'},
        created_at: {type: 'string'},
        updated_at: {type: 'string'}
      }
    }
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/User_Url`,
        through: {
          from: 'User_Url.url_id',
          to: 'User_Url.user_id'
        },
        to: 'User.id'
      },

      users: {
        relation: Model.BelongsToManyRelation,
        modelClass: `${__dirname}/User`,
        join: {
          from: 'Url.id',
          to: 'User.most_visited_url_id'
        }
      }
    }
  }

}
