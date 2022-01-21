import fs from 'fs'

export default async function getDirectories(path) {
    fs.readdirSync(path, function(err, content) {
        // console.log(content)
      if (err) {
        return err;
      } else {
        return content;
      }
    });
  }