const router = require('express').Router();
const sessionRouter = require('./session')
const userRouter = require('./users')
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', userRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});


module.exports = router;
