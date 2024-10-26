const baseUrl = 'http://localhost:3001/';

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

async function getItems() {
  return fetch(`${baseUrl}items`).then(checkResponse);
}

async function postItems(card) {
  return fetch(`${baseUrl}items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: card.name,
      weather: card.weather,
      imageUrl: card.link,
    }),
  }).then(checkResponse);
}

async function patchItems(card, id) {
  return fetch(`${baseUrl}items/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: card.name,
      weather: card.weather,
      imageUrl: card.link,
    }),
  }).then(checkResponse);
}

async function deleteItems(id) {
  return fetch(`${baseUrl}items/${id}`, {
    method: 'DELETE',
  }).then(checkResponse);
}

export { getItems, postItems, patchItems, deleteItems };
