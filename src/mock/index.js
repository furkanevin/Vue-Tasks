import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import json from '../../db.json'

export default function startMock() {
  const mock = new MockAdapter(axios)
  console.log('>> JSON', json)

  mock.onGet(import.meta.env.VITE_API_BASE_URL + '/tasks').reply(200, json.tasks)

  mock.onPost(import.meta.env.VITE_API_BASE_URL + '/tasks').reply((config) => {
    console.log('>> POST CONF', config)
    const inputData = JSON.parse(config.data)

    json.tasks.push(inputData)

    return [200, json.tasks]
  })

  // for regex look here: https://stackoverflow.com/a/58529574/2132069
  mock.onPut(new RegExp(import.meta.env.VITE_API_BASE_URL + '/tasks/*')).reply((config) => {
    const inputData = JSON.parse(config.data)
    console.log('>> INPUT DATA', inputData)

    let foundIndex = json.tasks.findIndex((item) => item.id == inputData.id)

    if (typeof foundIndex !== 'undefined') {
      json.tasks.splice(foundIndex, 1, inputData)
    }

    return [200, json.tasks]
  })

  return mock
}
