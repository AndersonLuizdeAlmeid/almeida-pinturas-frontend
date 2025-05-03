module.exports = {
  async rewrites() {
    return [
      {
        source: "/Authentications/:path*",
        destination: "http://api-gateway:8080/Authentications/:path*",
      },
      {
        source: "/Users/:path*",
        destination: "http://api-gateway:8080/Users/:path*",
      },
      {
        source: "/Documents/:path*",
        destination: "http://api-gateway:8080/Documents/:path*",
      },
      {
        source: "/Measures/:path*",
        destination: "http://api-gateway:8080/Measures/:path*",
      },
    ];
  },
};
