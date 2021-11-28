module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Doodle Poll Clone",
  },
  plugins: [{
    // The name of the plugin
    resolve: 'gatsby-source-mongodb',
    options: {
        // Name of the database and collection where are books reside
        dbName: 'sample-mflix',
        collection: 'comments',
        server: {
            address: 'cluster0-shard-00-01.hp38e.mongodb.net',
            port: 27017
        },
        auth: {
            user: 'admin',
            password: 'Password'
        }
    }
  }],
};
