function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getFeed() {
  await sleep(2000);
}
