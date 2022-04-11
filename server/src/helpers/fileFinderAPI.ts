import fs from 'fs'
import chalk from 'chalk'

type file = {
  path: string,
  name: string,
  extension: string,
  complete: string,
}

/**
 * Recursively searches for all the files in a folder
 * @param start the base path where the program should look
 * @param extension the extension to find
 * @param path the current path the function is searching, leave empty
 * @returns a list of `file` found
 */
export function findFiles(start: string, extension: string, path: string = ''): file[] {
  let search: string[] = []

  //* we search all the entries in the base folder
  try {
    search = fs.readdirSync(start + path)
  } catch (error) {
    console.log(chalk.yellow('[WARN]'), `"${start + path}" folder not found!`)
    return []
  }
  let files: file[] = []

  //* for each entry...
  search.forEach((entry) => {
    //* if it is a file we are looking for we save it
    if(entry.endsWith(extension)) {
      files.push({
        name: entry.replace(extension, ''),
        path,
        extension,
        complete: `${start}${path}/${entry}`
      })

    //* if it is a folder we search in it recursively
    } else if(!entry.includes('.')) {
      let p = `${path}/${entry}`

      files = files.concat(findFiles(start, extension, p))
    }
  })

  return files
}