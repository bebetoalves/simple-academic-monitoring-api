'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Usuario extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.senha) {
        userInstance.senha = await Hash.make(userInstance.senha)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  tipos() {
    return this.belongsToMany('App/Models/Tipo', 'usuario_id', 'tipo_id', 'id', 'id')
      .pivotTable('usuario_tipo');
  }

  disciplinas() {
    return this.belongsToMany('App/Models/Disciplinas', 'usuario_id', 'disciplina_id', 'id', 'id')
      .pivotTable('professor_disciplina');
  }
}

module.exports = Usuario
