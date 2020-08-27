const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const uuid = require('uuid-v4');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: 'lambe-victor',
    keyFilename: 'lambe-victor-firebase-adminsdk-fdwuz-0d02213f06.json'
});

exports.uploadImage = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        try {
            fs.writeFileSync('/tmp/imageToSave.jpg', request.body.image, 'base64');

            const bucket = storage.bucket('lambe-victor.appspot.com');
            const id = uuid();

            bucket.upload('/tmp/imageToSave.jpg', {
                uploadType: 'media',
                destination: `/posts/${id}.jpg`,
                metadata: {
                    metadata: {
                        contentType: 'image/jpeg',
                        firebaseStorageDownloadTokens: id
                    }
                }
            }, (error, file) => {
                if (error) {
                    return response.status(500).json({ error: error });
                } else {
                    const fileName = encodeURIComponent(file.name);
                    const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/' + bucket.name + '/o/' + fileName + '?alt=media&token=' + id
                    return response.status(201).json({ imageUrl: imageUrl });
                }
            });
        } catch (error) {
            return response.sendStatus(500).json({ error });
        }
    });
});
