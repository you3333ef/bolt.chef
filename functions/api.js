export const onRequestPost = async ({ request }) => {
  return new Response('POST to /api received - Chef + Bolt.diy unified endpoint');
};

export const onRequestGet = () => new Response('GET to /api');
