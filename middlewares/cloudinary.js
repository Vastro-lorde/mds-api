const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'spiritvd', 
    api_key: '325536184835491', 
    api_secret: 'E4EZN9X2-YlXUI_iA5Mo4K4JAAE' 
  });

module.exports = cloudinary;