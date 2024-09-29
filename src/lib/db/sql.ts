
const sqlconstants = {
  shorten: {
    select: 'SELECT short_code FROM urls WHERE original_url = $1',
    insert: 'INSERT INTO urls (original_url, short_code) VALUES ($1, $2)',
  },
  geturl: {
    select: 'SELECT original_url FROM urls WHERE short_code = $1',
  },
  admin: {
    select: 'SELECT id, original_url, short_code, created_at FROM urls ORDER BY created_at DESC',
  }
};

export default sqlconstants;
