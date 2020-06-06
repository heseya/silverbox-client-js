import test from 'ava';
import Silverbox from './Silverbox';

test('Silverbox creates succesfully', t => {
  const silverbox = new Silverbox({
    host: 'heseya.com'
  });

  t.true(silverbox instanceof Silverbox);
});

test('Silverbox constructor fails', async t => {
  const error = await t.throws(() => {
    new Silverbox({
      host: null
    });
  });

  t.is(error.message, '[Silverbox] Host cannot be null');
});
