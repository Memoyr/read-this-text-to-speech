module.exports = {
    webpack: (config) => {
      config.resolve.fallback = { 
        ...config.resolve.fallback,
        fs: false,
        path: false
     };
     config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
      });
  
      return config;
    },
    env: {
        ROOT: __dirname,
    }
  };
  