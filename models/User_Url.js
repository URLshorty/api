// const Model = require('objection').Model;

// export default class User_Url extends Model {
//   // Table name like this is the only required property.
//   static get tableName() {
//     return 'User_Url';
//   }

//   // This is not the database schema! Nothing is This is only used for
//   // validation. Whenever a model instance is created it is checked against 
//   // this schema. http://json-schema.org/.
//   static get jsonSchema() {
//     type: 'object',
//     required: ['username', 'email', 'passwordDigest'],

//     properties: {
//       id: {type: 'integer'},
//       userId: {type: 'string', minLength: 1, maxLength: 50},
//       UrlId: {type: 'string', minLength: 1, maxLength: 80},
//       passwordDigest: {type: 'integer'},
//       createdAt: {type: 'string'},
//       updatedAt: {type: 'string'}
//     }
//   }

//   // This object defines the relations to other models.
//   static get relationMappings() {
//     users: {
//       relation: Model.HasOneRelation,
//       modelClass: User,
//       join: {
//         from: 'User_Url.userId',
//         to: 'User.Id'
//       }
//     },

//     urls: {
//       relation: Model.HasOneRelation,
//       modelClass: Url,
//       join: {
//         from: 'User_Url.urlId',
//         to: 'Url.Id'
//       }
//     }
//   }

// }
