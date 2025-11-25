export const onRequest = [
  async ({ next, request, env }) => {
    const url = new URL(request.url);
    
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'healthy',
        service: 'Chef + Bolt.diy on Cloudflare Pages',
        timestamp: new Date().toISOString()
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (url.pathname === '/api/unified/applications' && request.method === 'POST') {
      const body = await request.json();
      return new Response(JSON.stringify({
        success: true,
        message: `Generated from prompt: ${body.prompt}`,
        chefInfra: 'Provisioned',
        boltApp: 'Deployed'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return next();
  }
];
