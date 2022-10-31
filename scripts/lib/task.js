const ora = require('ora')

/**
 * @template T
 * @param {string} name
 * @param {boolean} verbose
 * @param {() => PromiseLike<T> | T} fn
 * @returns {Promise<T>}
 */
module.exports = async function task (name, verbose, fn) {
  let spinner
  if (verbose) {
    console.error(name)
  } else {
    spinner = ora(name).start()
  }

  try {
    const result = await fn()
    if (spinner) spinner.succeed()
    return result
  } catch (error) {
    if (spinner) spinner.fail(String(error))
    throw error
  }
}
