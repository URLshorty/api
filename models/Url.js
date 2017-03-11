const Model = require('objection').Model

export default class Url extends Model {
  // Table name like this is the only required property.
  static get tableName() {
    return 'Url';
  }

  // This is not the database schema! Nothing is This is only used for
  // validation. Whenever a model instance is created it is checked against 
  // this schema. http://json-schema.org/.
  jsonSchema = {
    type: 'object',
    required: ['original'],

    properties: {
      id: {type: 'integer'},
      original: {type: 'string', minLength: 1},
      shortened: {type: 'string', minLength: 1, maxLength: 255},
      requests: {type: 'integer'},
      createdAt: {type: 'string'},
      updatedAt: {type: 'string'}
    }
  }

  // This object defines the relations to other models.
  relationMappings = {
    users: {
      relation: Model.ManyToManyRelation,
      modelClass: User_URLs,
      through: {
        from: 'User_Url.urlId',
        to: 'User_Url.userId'
      },
      to: 'User.id'
    },

    users: {
      relation: Model.BelongsToManyRelation,
      modelClass: User,
      join: {
        from: 'Url.id',
        to: 'User.mostVisitedUrlId'
      }
    }
  }

}
