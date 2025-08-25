const cloudinary = require('../middlewares/cloudinary');

// Normalize Cloudinary responses to a consistent shape
function normalizeResource(r) {
  if (!r) return null;
  return {
    publicId: r.public_id,
    assetId: r.asset_id,
    version: r.version,
    format: r.format,
    resourceType: r.resource_type,
    type: r.type,
    bytes: r.bytes,
    width: r.width,
    height: r.height,
    url: r.url,
    secureUrl: r.secure_url,
    originalFilename: r.original_filename,
    folder: r.folder,
    createdAt: r.created_at,
    etag: r.etag,
    tags: r.tags,
    context: r.context,
    metadata: r.metadata,
  };
}

// CREATE: Upload from a local/remote path
async function uploadFile(filePathOrUrl, options = {}) {
  try {
    const res = await cloudinary.uploader.upload(filePathOrUrl, options);
    return normalizeResource(res);
  } catch (err) {
    err.message = `Cloudinary upload failed: ${err.message}`;
    throw err;
  }
}

// CREATE: Upload from a Buffer (e.g., Multer memory storage)
function uploadBuffer(buffer, options = {}) {
  if (!buffer) throw new Error('uploadBuffer: buffer is required');
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, res) => {
      if (err) return reject(new Error(`Cloudinary upload_stream failed: ${err.message}`));
      resolve(normalizeResource(res));
    });
    stream.end(buffer);
  });
}

// READ: Get a single resource by public ID
async function getResource(publicId, options = {}) {
  if (!publicId) throw new Error('getResource: publicId is required');
  try {
    const res = await cloudinary.api.resource(publicId, options);
    return normalizeResource(res);
  } catch (err) {
    err.message = `Cloudinary getResource failed: ${err.message}`;
    throw err;
  }
}

// READ: List resources by folder/prefix
async function listByFolder(folder, options = {}) {
  if (!folder) throw new Error('listByFolder: folder is required');
  try {
    const res = await cloudinary.api.resources({ prefix: `${folder}/`, type: 'upload', ...options });
    return Array.isArray(res.resources) ? res.resources.map(normalizeResource) : [];
  } catch (err) {
    err.message = `Cloudinary listByFolder failed: ${err.message}`;
    throw err;
  }
}

// UPDATE: Update resource metadata (tags, context, etc.)
async function updateResource(publicId, updates = {}) {
  if (!publicId) throw new Error('updateResource: publicId is required');
  try {
    const res = await cloudinary.api.update(publicId, updates);
    return normalizeResource(res);
  } catch (err) {
    err.message = `Cloudinary updateResource failed: ${err.message}`;
    throw err;
  }
}

// UPDATE: Rename/move a resource (optionally across folders)
async function renameResource(fromPublicId, toPublicId, options = {}) {
  if (!fromPublicId || !toPublicId) throw new Error('renameResource: fromPublicId and toPublicId are required');
  try {
    const res = await cloudinary.uploader.rename(fromPublicId, toPublicId, options);
    return normalizeResource(res);
  } catch (err) {
    err.message = `Cloudinary renameResource failed: ${err.message}`;
    throw err;
  }
}

// DELETE: Delete a single resource by public ID
async function deleteResource(publicId, options = {}) {
  if (!publicId) throw new Error('deleteResource: publicId is required');
  try {
    const res = await cloudinary.uploader.destroy(publicId, options);
    return res; // { result: 'ok' | 'not found' | 'already deleted' }
  } catch (err) {
    err.message = `Cloudinary deleteResource failed: ${err.message}`;
    throw err;
  }
}

// DELETE: Bulk delete by prefix (folder) or by tag
async function deleteByPrefix(prefix, options = {}) {
  if (!prefix) throw new Error('deleteByPrefix: prefix is required');
  try {
    return await cloudinary.api.delete_resources_by_prefix(prefix, options);
  } catch (err) {
    err.message = `Cloudinary deleteByPrefix failed: ${err.message}`;
    throw err;
  }
}

async function deleteByTag(tag, options = {}) {
  if (!tag) throw new Error('deleteByTag: tag is required');
  try {
    return await cloudinary.api.delete_resources_by_tag(tag, options);
  } catch (err) {
    err.message = `Cloudinary deleteByTag failed: ${err.message}`;
    throw err;
  }
}

// URL: Generate a transformed URL for a public ID
function generateUrl(publicId, options = {}) {
  if (!publicId) throw new Error('generateUrl: publicId is required');
  return cloudinary.url(publicId, options);
}

module.exports = {
  // create
  uploadFile,
  uploadBuffer,
  // read
  getResource,
  listByFolder,
  // update
  updateResource,
  renameResource,
  // delete
  deleteResource,
  deleteByPrefix,
  deleteByTag,
  // url helpers
  generateUrl,
};
