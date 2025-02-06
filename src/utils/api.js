export const baseUrl = 'http://localhost:3001/';

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

async function getItems() {
  return fetch(`${baseUrl}items`).then(checkResponse);
}

async function postItems(card, token) {
  return fetch(`${baseUrl}items`, {
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
  }).then(checkResponse);
}

async function patchItems(card, id, token) {
  return fetch(`${baseUrl}items/${id}`, {
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
  }).then(checkResponse);
}

async function deleteItems(id, token) {
  return fetch(`${baseUrl}items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

async function addCardLike(id, token) {
  return fetch(`${baseUrl}items/${id}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

async function removeCardLike(id, token) {
  return fetch(`${baseUrl}items/${id}/likes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export {
  getItems,
  postItems,
  patchItems,
  deleteItems,
  addCardLike,
  removeCardLike,
};
