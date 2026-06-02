import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

// Health check
app.get('/make-server-55fff793/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Submit lead to amoCRM
app.post('/make-server-55fff793/lead', async (c) => {
  try {
    const body = await c.req.json();
    const { 
      name, 
      phone, 
      email, 
      crm,
      users,
      implPackage,
      totalCost,
      calculationDetails 
    } = body;

    // Validate required fields
    if (!name || !phone) {
      return c.json({ error: 'Имя и телефон обязательны' }, 400);
    }

    // Get amoCRM credentials from environment
    const AMO_DOMAIN = Deno.env.get('AMO_DOMAIN'); // example: yourcompany.amocrm.ru
    const AMO_ACCESS_TOKEN = Deno.env.get('AMO_ACCESS_TOKEN');

    if (!AMO_DOMAIN || !AMO_ACCESS_TOKEN) {
      console.error('amoCRM credentials not configured');
      
      // Save to database as fallback
      const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await kv.set(leadId, {
        name,
        phone,
        email,
        crm,
        users,
        implPackage,
        totalCost,
        calculationDetails,
        createdAt: new Date().toISOString(),
        status: 'pending_amo_config'
      });

      return c.json({ 
        success: false, 
        error: 'amoCRM не настроен. Заявка сохранена в базе.',
        leadId 
      }, 500);
    }

    // Create lead in amoCRM
    const amoLead = {
      name: `Заявка с калькулятора: ${implPackage}`,
      price: totalCost,
      custom_fields_values: [
        {
          field_code: 'PHONE',
          values: [{ value: phone }]
        },
        {
          field_code: 'EMAIL',
          values: [{ value: email }]
        }
      ],
      _embedded: {
        contacts: [
          {
            name: name,
            custom_fields_values: [
              {
                field_code: 'PHONE',
                values: [{ value: phone }]
              },
              {
                field_code: 'EMAIL',
                values: [{ value: email }]
              }
            ]
          }
        ]
      }
    };

    // Send to amoCRM
    const amoResponse = await fetch(`https://${AMO_DOMAIN}/api/v4/leads/complex`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AMO_ACCESS_TOKEN}`
      },
      body: JSON.stringify([amoLead])
    });

    const amoData = await amoResponse.json();

    if (!amoResponse.ok) {
      console.error('amoCRM API error:', amoData);
      
      // Save to database as fallback
      const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await kv.set(leadId, {
        name,
        phone,
        email,
        crm,
        users,
        implPackage,
        totalCost,
        calculationDetails,
        createdAt: new Date().toISOString(),
        status: 'amo_error',
        amoError: amoData
      });

      return c.json({ 
        success: false, 
        error: 'Ошибка отправки в amoCRM',
        details: amoData,
        leadId 
      }, 500);
    }

    // Save to database for backup
    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await kv.set(leadId, {
      name,
      phone,
      email,
      crm,
      users,
      implPackage,
      totalCost,
      calculationDetails,
      createdAt: new Date().toISOString(),
      status: 'sent_to_amo',
      amoLeadId: amoData[0]?.id
    });

    return c.json({ 
      success: true, 
      message: 'Заявка успешно отправлена',
      leadId,
      amoLeadId: amoData[0]?.id 
    });

  } catch (error) {
    console.error('Error processing lead:', error);
    return c.json({ 
      error: 'Внутренняя ошибка сервера', 
      details: error.message 
    }, 500);
  }
});

// Get all leads (for admin panel, optional)
app.get('/make-server-55fff793/leads', async (c) => {
  try {
    const leads = await kv.getByPrefix('lead_');
    return c.json({ leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return c.json({ error: 'Ошибка получения заявок' }, 500);
  }
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ error: 'Internal server error', details: err.message }, 500);
});

Deno.serve(app.fetch);
