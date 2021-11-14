/* eslint-disable no-console */
import './setup.js';
import { app } from './app.js';

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line prefer-template
  console.log('Server running on port ' + process.env.PORT);
});

// app.listen(4000);
