import { Model } from 'objection'

export default class Url extends Model {
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
      required: ['address'],
      properties: {
        id: {type: 'integer'},
        address: {type: 'string', minLength: 1},
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

  static async create(url) {
    let promReturn = 'error at url#create'
    await
      this
        .query()
        .insert({address: url})
        .then((newUrl) => {
          console.log(`new URL ${newUrl.address} created`)
          promReturn = newUrl
        })
        .catch((er) => {
          console.log(er)
          promReturn = promReturn + ": " + er
        })
    return promReturn
  }

  static async getMostRequested(count, selections) {
    let promReturn = 'error at Url::getMostRequested'
    await this
        .query()
        .select(selections)
        .orderBy('requests', 'desc')
        .limit(count)
        .then( (arr) => promReturn = arr )
        .catch( (er) => promReturn = promReturn + ": " + er )
    return promReturn
  }

  static async getMostVisited(count, selections) {
    let promReturn = 'error at Url::getMostVisited'
    await this
        .query()
        .select(selections)
        .orderBy('visits', 'desc')
        .limit(count)
        .then( (arr) => promReturn = arr )
        .catch( (er) => promReturn = promReturn + ": " + er )
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
