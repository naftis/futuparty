import { apiFetch } from './api';

const uploadToPresignedUrl = (signedRequest, url, image) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = function(error) {
      console.log(xhr.responseText);
      console.log(xhr);
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Image successfully uploaded to S3');
          resolve(url);
        } else {
          console.log('Error while sending the image to S3');
          reject(error);
        }
      }
    };
    xhr.setRequestHeader('Content-Type', 'image/jpeg');
    xhr.send({
      uri: image.url,
      type: 'image/jpeg',
      name: image.itemName
    });
  });
};

export const getPreSignedUrl = async image => {
  const link = `/sign-s3?file-name=img/${image.itemName}&file-type=image/jpeg`;
  const res = await apiFetch(link);
  const response = await res.json();
  const { signedRequest, url } = response;

  return await uploadToPresignedUrl(signedRequest, url, image);
};
