module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0e56418e558b1fff4f4af7bf08962536'),
  },
});
