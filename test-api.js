const axios = require('axios');

async function testApi() {
  try {
    console.log('Testing API...');
    const response = await axios.get('http://localhost:5000/api/doctor/list');
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('API Error:', error.message);
  }
}

testApi();
