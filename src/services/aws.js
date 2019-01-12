import { apiFetch } from './api';

export const getPreSignedUrl = async (image, folder) => {
  const link = `/sign-s3?file-name=${folder}/${image.itemName}&file-type=image/jpeg`;

  const res = await apiFetch(link);
  const response = await res.json();

  const { signedRequest, url } = response;

  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = function (error) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('Image successfully uploaded to S3');
      } else {
        console.log('Error while sending the image to S3');
        console.log(error);
      }
    }
  };
  xhr.setRequestHeader('Content-Type', 'image/jpeg');
  xhr.send({
    uri: image.url,
    type: 'image/jpeg',
    name: image.itemName,
  });

  return url;
};
