const Model = require('objection').Model

// why doesn't export default class...' work here
class Url extends Model {
  // Table name is the only required property.
  static get tableName() {
    // name of table in db
    return 'urls';
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
        // model class of final destination table, not immediate join!
        modelClass: `${__dirname}/User`,
        join: {
          from: 'urls.id',
          through: {
            from: 'user_urls.url_id',
            to: 'user_urls.user_id'
          },
          to: 'users.id'
        }
      },

      user: {
        relation: Model.HasOneRelation,
        modelClass: `${__dirname}/User`,
        join: {
          from: 'urls.id',
          to: 'users.most_visited_url_id'
        }
      }
    }
  }

}

module.exports = Url
