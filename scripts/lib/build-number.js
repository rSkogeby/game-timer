const fs = require('fs').promises

/**
 * @returns {Promise<number>}
 */
module.exports = async function incrementBuildNumber () {
  const env = JSON.parse(await fs.readFile('.env', { encoding: 'utf8' }))

  const incrementedBuildNumber = parseInt(env.expoBuildNumber) + 1

  await fs.writeFile('.env', JSON.stringify({ ...env, expoBuildNumber: incrementedBuildNumber.toString() }, null, 2))

  return incrementedBuildNumber
}
