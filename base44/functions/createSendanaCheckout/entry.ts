import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';
import { secrets } from 'base44:runtime';

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const items = Array.isArray(body.items) ? body.items : [];
    if (!items.length) {
      return Response.json({ error: 'Your cart is empty.' }, { status: 400 });
    }

    const total = items.reduce((s, i) => s + Number(i.price || 0) * Number(i.quantity || 1), 0);
    if (total <= 0) {
      return Response.json({ error: 'Invalid order total.' }, { status: 400 });
    }

    const orderReference = 'TT-' + Date.now().toString(36).toUpperCase();
    const itemsSummary = items.map((i) => `${i.quantity}x ${i.title}`).join(', ');
    const itemsJson = JSON.stringify(items);

    let order = { id: null };
    try {
      order = await base44.asServiceRole.entities.Order.create({
        order_reference: orderReference,
        total,
        status: 'pending',
        customer_email: body.customer_email || '',
        customer_name: body.customer_name || '',
        items_json: itemsJson,
      });
    } catch {
      /* order tracking is best-effort */
    }

    const apiKey = secrets.get('SENDANA_API_KEY');
    const merchantId = secrets.get('SENDANA_MERCHANT_ID');
    const baseUrl = secrets.get('SENDANA_API_BASE_URL');
    if (!apiKey || !merchantId || !baseUrl) {
      return Response.json(
        {
          error:
            'Sendana is not yet configured. Add your Sendana merchant credentials (SENDANA_API_KEY, SENDANA_MERCHANT_ID, SENDANA_API_BASE_URL) in the app secrets to enable checkout.',
          order_reference: orderReference,
          total,
        },
        { status: 503 }
      );
    }

    const returnUrl =
      body.return_url || new URL('/order-success', new URL(req.url).origin).href;

    let data = {};
    try {
      const res = await fetch(baseUrl.replace(/\/$/, '') + '/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + apiKey,
        },
        body: JSON.stringify({
          merchant_id: merchantId,
          amount: Number(total.toFixed(2)),
          currency: 'USD',
          reference: orderReference,
          description: itemsSummary,
          return_url: returnUrl,
          customer_email: body.customer_email || undefined,
          customer_name: body.customer_name || undefined,
        }),
      });
      data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return Response.json(
          {
            error:
              'Sendana rejected the payment request: ' +
              (data.message || data.error || res.statusText),
            order_reference: orderReference,
          },
          { status: 502 }
        );
      }
    } catch (e) {
      return Response.json(
        { error: 'Could not reach Sendana: ' + e.message, order_reference: orderReference },
        { status: 502 }
      );
    }

    const checkoutUrl =
      data.checkout_url ||
      data.payment_url ||
      data.redirect_url ||
      data.url ||
      (data.links && data.links.redirect && data.links.redirect.href) ||
      (data.data && (data.data.checkout_url || data.data.payment_url || data.data.redirect_url));

    if (!checkoutUrl) {
      return Response.json(
        {
          error:
            'Sendana did not return a checkout URL. Confirm the API response shape against Sendana merchant docs.',
          order_reference: orderReference,
        },
        { status: 502 }
      );
    }

    return Response.json({
      checkout_url: checkoutUrl,
      order_id: order.id,
      order_reference: orderReference,
      total,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}