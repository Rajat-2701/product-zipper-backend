const cloudinary = require('cloudinary').v2;

const dotenv = require('dotenv');

dotenv.config;

cloudinary.config({
  cloud_name: 'dvwtqsrv3',
  api_key: '524694372332363',
  api_secret: 'tiKX6Rs4K3LfTsiaim3kZWTrYQA',
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    try {
      cloudinary.uploader.upload(
        file,
        { folder },
        (error, result) => {
          console.log(result, 'ddjdjdj', error);
          resolve({
            url: result.url,
            public_id: result.public_id,
          });
        },
        {
          resource_type: 'auto',
          folder: folder,
        },
      );
    } catch (error) {
      console.log(error, 'cearromoo');
    }
  });
};
