/* global remote https fs os */

const downloadIconAsync = appId =>
  new Promise((resolve, reject) => {
    let iconExt;
    switch (os.platform()) {
      case 'darwin': {
        iconExt = 'icns';
        break;
      }
      case 'linux': {
        iconExt = 'png';
        break;
      }
      case 'win32':
      default: {
        iconExt = 'ico';
      }
    }

    const iconPath = `${remote.app.getPath('temp')}/${Math.floor(Date.now())}.${iconExt}`;
    const iconFile = fs.createWriteStream(iconPath);

    const req = https.get(`https://cdn.rawgit.com/webcatalog/backend/compiled/images/${appId}.${iconExt}`, (response) => {
      response.pipe(iconFile);

      iconFile.on('error', (err) => {
        reject(err);
      });

      iconFile.on('finish', () => {
        resolve(iconPath);
      });
    });

    req.on('error', (err) => {
      reject(err);
    });
  });

export default downloadIconAsync;