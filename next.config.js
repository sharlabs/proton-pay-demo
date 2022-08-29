module.exports = ({
  env: {
    REACT_APP_RECAPTCHA: process.env.REACT_APP_RECAPTCHA,
    RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    HYPERION_ENDPOINT: process.env.HYPERION_ENDPOINT,
    NEXT_PUBLIC_CHAIN_ENDPOINTS: process.env.NEXT_PUBLIC_CHAIN_ENDPOINTS,
    PROTN_CHAINID: process.env.PROTN_CHAINID
  },
  target: "serverless",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["url-loader"],
    });

    return config;
  },
});
