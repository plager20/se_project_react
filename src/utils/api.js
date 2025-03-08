export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.plagerwtwr.crabdance.com'
    : 'http://localhost:3001';

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

async function getItems() {
  return request(`${baseUrl}/items`);
}

async function postItems(card, token) {
  return request(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: card.name,
      weather: card.weather,
      imageUrl: card.link,
    }),
  });
}

async function patchItems(card, id, token) {
  return request(`${baseUrl}/items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: card.name,
      weather: card.weather,
      imageUrl: card.link,
    }),
  });
}

async function deleteItems(id, token) {
  return request(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
}

async function addCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
}

async function removeCardLike(id, token) {
  return request(`${baseUrl}items/${id}/likes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
}

export {
  getItems,
  postItems,
  patchItems,
  deleteItems,
  addCardLike,
  removeCardLike,
};
