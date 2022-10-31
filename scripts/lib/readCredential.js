const keytar = require('keytar')

/**
 * @param name {string}
 * @returns {Promise<{ account: string, password: string }>}
 */
module.exports = async function readCredential (name) {
  const credentials = await keytar.findCredentials(name)

  if (credentials.length === 0) {
    throw new Error(`Unable to find credentials for "${name}"`)
  }

  return credentials[0]
}
