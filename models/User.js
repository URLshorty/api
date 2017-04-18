import { Model } from 'objection'
import bcrypt from 'bcrypt'
import {
  User_Url,
  Url
} from './'

export default class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    // name of table in db
    return 'users'
  }

  // Not the database schema! Only validation during
  // instantiation http://json-schema.org/
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'email', 'password_digest'],
      properties: {
        id: {type: 'integer'},
        username: {type: 'string', minLength: 1, maxLength: 50},
        email: {type: 'string', minLength: 1, maxLength: 80},
        password_digest: {type: 'string', maxLength: 70},
        is_admin: {type: 'integer'},
        most_visited_url_id: {type: 'integer'},
        created_at: {type: 'string'},
        updated_at: {type: 'string'}
      }
    }
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      urls: {
        relation: Model.ManyToManyRelation,
        // model class of final destination table, not immediate join!
        modelClass: `${__dirname}/Url`,
        join: {
          from: 'users.id',
          through: {
            from: 'user_urls.user_id',
            to: 'user_urls.url_id'
          },
          to: 'urls.id'
        }
      },

      url: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Url`,
        join: {
          from: 'users.most_visited_url_id',
          to: 'urls.id'
        }
      }
    }
  }


  static async create(userHash) {
    try {
      const newUser = await this
        .query()
        .insert({
          ...userHash,
          password_digest: bcrypt.hashSync(userHash.password, 10)
        })
      console.log(`new user ${newUser.username} created`)
      return newUser
    } catch (er) {
      console.log(`error at User::create: ${er}`)
      throw er
    }
  }

  async createUrl(url) {
    try {
      const newUrl = await Url
        .create(url, this)
      console.log(`${this.username} created ${newUrl.url.address}`)
      return newUrl
    } catch (er) {
      console.log(`error at user#createUrl: ${er}`)
      throw er
    }
  }

  async getMostPopular() {
    try {
      let shortArr = await User_Url
        .query()
        .where('user_id', this.id)
        .orderBy('visits', 'desc')
      let short = shortArr[0]
      if (short) {
        let longArr = await Url
          .query()
          .where('id', short.url_id)
        let long = longArr[0]
        return {
          longAddress: long.address,
          shortAddress: short.shortened,
        }
      } else {
        return {
          longAddress: null,
          shortAddress: null,
        }
      }
    } catch (er) {
      console.log(`error at user#getMostPopular: ${er}`)
      throw er
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
