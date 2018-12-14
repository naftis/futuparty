function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getFeed() {
  await sleep(500);

  return [
    {
      key: '1',
      author: 'Pyry Rouvila',
      time: '5 hours ago',
      text: 'Hello!'
    },
    {
      key: '2',
      author: 'Pyry Rouvila',
      time: '5 hours ago',
      text: 'Hello!'
    },
    {
      key: '3',
      author: 'Pyry Rouvila',
      time: '5 hours ago',
      imageUrl: 'https://placehold.it/350x350',
      text: 'Moro! Mukava kun kaikki pääsitte paikalle!!!'
    },
    {
      key: '2x',
      author: 'Pyry Rouvila',
      time: '5 hours ago',
      text: 'Hello!'
    },
    {
      key: '3xx',
      author: 'Pyry Rouvila',
      time: '5 hours ago',
      imageUrl: 'https://placehold.it/350x350'
    }
  ];
}

export function getProfileImageUrl() {
  return 'https://placeimg.com/640/480/nature';
}
