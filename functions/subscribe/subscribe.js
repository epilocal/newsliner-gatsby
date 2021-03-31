const jwt = require('jsonwebtoken');
const axios = require('axios');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 200,
      headers,
      body: 'Method Not Allowed' };
  }
  const errorGen = msg => {
    return {
      statusCode: 500,
      body: msg
    };
  };
  try {
    const { email } = JSON.parse(event.body);
    if (!email) {
      return errorGen('Missing Email');
    }

    // Split the key into ID and SECRET
    const key = process.env.GHOST_ADMIN_API_KEY;
    const [id, secret] = key.split(':');

    // Create the token (including decoding secret)
    const token = jwt.sign({}, Buffer.from(secret, 'hex'), {
        keyid: id,
        algorithm: 'HS256',
        expiresIn: '5m',
        audience: `/v3/admin/`
    });

    // Make an authenticated request to create a post
    const url = `${process.env.GHOST_ADMIN_API_URL}/members/`;
    const headers = { Authorization: `Ghost ${token}` };
    const payload = { members: [{ email: email }] };

    const response = await axios.post(url, payload, { headers });

    if (response.response.status === 422) {
      return {
        statusCode: 422,
        body: JSON.stringify({ msg: "Already subscribed", detail: response.data, }),
      };
    }
    else if (response.response.status >= 300 || response.response.status < 200) {
      return {
        statusCode: response.response.status,
        body: response
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Successfully subscribed", detail: response.data, }),
    };


  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
