import axios from 'axios';

console.log('Reminder: Please ensure that the server is listening on port 3000');

describe('Server', () => {
  test('responds to GET request to / with an html file', () => {
    expect.assertions(3);
    return axios.get('http://localhost:3000')
      .then((response) => {
        expect(response.data).toMatch(/html/);
        expect(response.data).toMatch(/head/);
        expect(response.data).toMatch(/body/);
      });
  });

  test('responds to GET request to /restaurants', () => {
    expect.assertions(2);
    return axios.get('http://localhost:3000/restaurants')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(typeof response.data).toBe('string');
      });
  });
});
