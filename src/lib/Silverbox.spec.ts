import test from 'ava';
import { Silverbox } from './Silverbox';

const CREDENTIALS = {
  host: 'https://cdn.example.com',
  client: 'example',
  key: 'key',
};

test('Silverbox creates succesfully', (t) => {
  const silverbox = new Silverbox(CREDENTIALS);
  t.true(silverbox instanceof Silverbox);
});

test('Silverbox change host', (t) => {
  const silverbox = new Silverbox(CREDENTIALS);
  t.is(silverbox.getHost(), CREDENTIALS.host);
  silverbox.setHost('https://example.com');
  t.not(silverbox.getHost(), CREDENTIALS.host);
});

test('Silverbox change client', (t) => {
  const silverbox = new Silverbox(CREDENTIALS);
  t.is(silverbox.getClient(), CREDENTIALS.client);
  silverbox.setClient('https://example.com');
  t.not(silverbox.getClient(), CREDENTIALS.client);
});

test('Silverbox clone instance', (t) => {
  const silverbox = new Silverbox(CREDENTIALS);
  const clone = silverbox.clone();

  t.deepEqual(clone, silverbox); // Has all same props
  t.not(clone, silverbox); // But different instances
});

test('Silverbox returns full file path', (t) => {
  const silverbox = new Silverbox(CREDENTIALS);
  const path = silverbox.getURL('image.png');
  t.is(path, 'https://cdn.example.com/example/image.png');
});

test('Silverbox get file URL as other client', (t) => {
  const silverbox = new Silverbox(CREDENTIALS);
  const path = silverbox.as('test').getURL('image.jpg');

  t.is(path, 'https://cdn.example.com/test/image.jpg');
});

test('Silverbox no host provided', async (t) => {
  const error = await t.throws(() => {
    new Silverbox({
      host: null,
      client: null,
    });
  });

  t.is(error.message, '[Silverbox] You need to provide a Host URL');
});

test('Silverbox no client provided', async (t) => {
  const error = await t.throws(() => {
    new Silverbox({
      host: CREDENTIALS.host,
      client: null,
    });
  });

  t.is(error.message, '[Silverbox] You need to provide a Client name');
});
