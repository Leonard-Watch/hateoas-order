/*  order.controller.js  */
// URL base (puede venir de variable de entorno en un caso real)
const URL_BASE = 'http://localhost:3000/api';

/* ----------  Helper interno: genera links según status  ---------- */
const buildOrderLinks = (order) => {
  const links = {
    self:   { href: `${URL_BASE}/orders/${order.id}`, method: 'GET' },
    list_all: { href: `${URL_BASE}/orders`, method: 'GET' }
  };

  switch (order.status) {
    case 'Pending':
      links.pay   = { href: `${URL_BASE}/orders/${order.id}/pay`,   method: 'POST' };
      links.cancel= { href: `${URL_BASE}/orders/${order.id}`,        method: 'DELETE' };
      break;

    case 'Paid':
      links.track_shipment = { href: `${URL_BASE}/orders/${order.id}/track`, method: 'GET' };
      links.refund         = { href: `${URL_BASE}/orders/${order.id}/refund`, method: 'POST' };
      break;

    case 'Cancelled':
      // no se añaden enlaces de acción
      break;
  }
  return links;
};

const getOrderDetail = (req, res) => {

  const orderId = parseInt(req.params.id, 10);

  const order = {
    id: orderId,
    userId: 101,               
    status: 'Pending',         // cambiar a 'Paid' o 'Cancelled' para probar
    total: 250.00
  };

  // 3. Ensamblar cuerpo JSON con HATEOAS
  const responseBody = {
    order_id: order.id,
    user_id:  order.userId,
    status:   order.status,
    total:    order.total,
    _links:   buildOrderLinks(order)
  };

  // 4. Devolverlo
  res.status(200).json(responseBody);
};


module.exports = { getOrderDetail };