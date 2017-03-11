const Model = require('objection').Model;

export default class User extends Model {
  // Table name like this is the only required property.
  static get tableName() {
    return 'User';
  }

  // This is not the database schema! Nothing is This is only used for
  // validation. Whenever a model instance is created it is checked against 
  // this schema. http://json-schema.org/.
  jsonSchema = {
    type: 'object',
    required: ['username', 'email', 'passwordDigest'],

    properties: {
      id: {type: 'integer'},
      username: {type: 'string', minLength: 1, maxLength: 50},
      email: {type: 'string', minLength: 1, maxLength: 80},
      passwordDigest: {type: 'integer'},
      createdAt: {type: 'string'},
      updatedAt: {type: 'string'}
    }
  }

  // This object defines the relations to other models.
  relationMappings = {
    Urls: {
      relation: Model.ManyToManyRelation,
      modelClass: User_Urls,
      through: {
        from: 'User_Url.userId'
        to: 'User_Url.urlId',
      },
      to: 'Url.id'
    },

    users: {
      relation: Model.HasOneRelation,
      modelClass: Url,
      join: {
        from: 'User.mostVisitedUrlId',
        to: 'Url.Id'
      }
    }
  }

}
