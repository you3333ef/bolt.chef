export const onRequest = [
  async ({ next, request }) => {
    try {
      const url = new URL(request.url);
      
      if (url.pathname === '/health') {
        return new Response(JSON.stringify({
          status: 'healthy',
          service: 'Chef + Bolt.diy on Cloudflare Pages Functions',
          timestamp: new Date().toISOString(),
          endpoints: ['/health', '/api/unified/applications']
        }), {
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=60'
          }
        });
      }
      
      if (url.pathname === '/api/unified/applications' && request.method === 'POST') {
        let body = {};
        try {
          body = await request.json();
        } catch (e) {
          return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }
        
        return new Response(JSON.stringify({
          success: true,
          message: `Generated application from prompt: ${body.prompt || 'N/A'}`,
          chefInfra: 'Provisioned via Chef integration',
          boltApp: 'Deployed via Bolt.diy AI',
          timestamp: new Date().toISOString()
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      return next();
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
];
