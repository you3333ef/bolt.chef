export const onRequest = [{ 
  request ({ request, next }) {
    const response = await next(request);
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}];
