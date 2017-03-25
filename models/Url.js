import { Model } from 'objection'
import {
  User,
  User_Url,
} from './'

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

  static async create(address, user) {
    let userId
    user ? userId = user.id : userId = null
    try {
      let newUserUrl
      const newUrl = await this
        .query()
        .insert({
          address: address
        })
      if (newUrl) {
        newUserUrl = await User_Url
          .query()
          .insert({
            url_id: newUrl.id,
            user_id: userId,
            shortened: "shortened version",
          })
      }
      console.log(`new URL created: ${newUrl.address}`)
      return {newUrl: newUrl, newUserUrl: newUserUrl}
    } catch (er) {
      console.log(`error at Url::create: ${er}`)
      return `error creating URL: ${er}`
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

  async getNewShortened(user) {

    // REWRITE ME WITH PROMISE.ALL
    try {
      // set user
      let currUserId = null
      if (user) {
        let currUserArr = await User
          .query()
          .where({
            id: user.id
          })
        currUserId = currUserArr[0].id
      }
      // new user_url
      let user_url = await User_Url
        .query()
        .insert({
          user_id: currUserId,
          url_id: this.id,
          shortened: "this is where the shortened version goes"
        })
      // increment requests on url
      await this.$query()
        .increment("requests", 1)
      console.log(`shortened: ${user_url}`)
      return {newUserUrl: user_url}
    } catch (er) {
      let message = `error at Url::getNewShortened: ${er}`
      console.log(message)
      return message
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
