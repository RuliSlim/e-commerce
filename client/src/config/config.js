let config;

if (process.env.NODE_ENV === 'production') {
  config = {
    $url: 'https://artsymeup.herokuapp.com'
  };
} else {
  config = {
    $url: 'http://localhost:3000'
  };
}

export { config };
