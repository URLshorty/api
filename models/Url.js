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
    try {
      const newUrl = await this
        .query()
        .insert({address: url})
      console.log(`new URL created: ${newUrl.address}`)
      return newUrl
    } catch (er) {
      console.log(`error at Url::create: ${er}`)
      return `error createing URL: ${er}`
    }
  }

  static async getMostRequested(count, selections) {
    try {
      const mostRequested = await this
        .query()
        .select(selections)
        .orderBy('requests', 'desc')
        .limit(count)
      return mostRequested
    } catch (er) {
      console.log(`error at Url::getMostRequested: ${er}`)
      return `error gathering most requested Urls: ${er}`
    }
  }

  static async getMostVisited(count, selections) {
    try {
      const mostVisited = await this
        .query()
        .select(selections)
        .orderBy('visits', 'desc')
        .limit(count)
      return mostVisited
    } catch (er) {
      console.log(`error at Url::getMostVisited: ${er}`)
      return `error gathering most visited Urls: ${er}`
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
