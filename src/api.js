function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getFeed() {
  await sleep(500);

  return [
    {
      key: '1',
      name: 'Pyry Rouvila',
      time: '5 hours ago',
      text: 'Hello!'
    },
    {
      key: '2',
      name: 'Pyry Rouvila',
      time: '5 hours ago',
      text: 'Hello!'
    },
    {
      key: '3',
      name: 'Pyry Rouvila',
      time: '5 hours ago',
      imageUrl: 'https://placehold.it/350x350'
    },
    {
      key: '2x',
      name: 'Pyry Rouvila',
      time: '5 hours ago',
      text: 'Hello!'
    },
    {
      key: '3xx',
      name: 'Pyry Rouvila',
      time: '5 hours ago',
      imageUrl: 'https://placehold.it/350x350'
    }
  ];
}
