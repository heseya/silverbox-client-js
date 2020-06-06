import test from 'ava';
import Silverbox from './Silverbox';

const CREDENTIALS = {
  host: 'https://cdn.heseya.com',
  client: 'heseya',
  key: 'key'
};

test('Silverbox creates succesfully', t => {
  const silverbox = new Silverbox(CREDENTIALS);
  t.true(silverbox instanceof Silverbox);
});

test('Silverbox change host', t => {
  const silverbox = new Silverbox(CREDENTIALS);
  t.is(silverbox.getHost(), CREDENTIALS.host);
  silverbox.setHost('https://heseya.com');
  t.not(silverbox.getHost(), CREDENTIALS.host);
});

test('Silverbox change client', t => {
  const silverbox = new Silverbox(CREDENTIALS);
  t.is(silverbox.getClient(), CREDENTIALS.client);
  silverbox.setClient('https://heseya.com');
  t.not(silverbox.getClient(), CREDENTIALS.client);
});

test('Silverbox clone instance', t => {
  const silverbox = new Silverbox(CREDENTIALS);
  const clone = silverbox.clone();

  t.deepEqual(clone, silverbox); // Has all same props
  t.not(clone, silverbox); // But different instances
});

test('Silverbox returns full file path', t => {
  const silverbox = new Silverbox(CREDENTIALS);
  const path = silverbox.get('image.png');
  t.is(path, 'https://cdn.heseya.com/heseya/image.png');
});

test('Silverbox get file as other client', t => {
  const silverbox = new Silverbox(CREDENTIALS);
  const path = silverbox.as('test').get('image.jpg');

  t.is(path, 'https://cdn.heseya.com/test/image.jpg');
});

test('Silverbox constructor fails', async t => {
  const error = await t.throws(() => {
    new Silverbox({
      host: null
    });
  });

  t.is(error.message, '[Silverbox] Host cannot be null');
});
