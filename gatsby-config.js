// support for .env, .env.development, and .env.production
require("dotenv").config()
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://lacerdadiasassociados.pt",
    title: "Lacerda Dias e Associados",
    author: `G-Fleck`,
    description: "A Gatsby Starter for building homepages with Contentful",
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        downloadLocal: true,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    `gatsby-transformer-remark`,
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    "gatsby-transformer-sharp",
    "gatsby-plugin-vanilla-extract",
    {
      resolve: 'gatsby-plugin-env-variables',
      options: {
        allowList: ["RECAPTCHA_KEY", "RECAPTCHA_SECRET_KEY"]
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Lacerda Dias e Associados",
        short_name: "Lacerda Dias e Associados",
        start_url: "/",
        // These can be imported once ESM support lands
        background_color: "#FEF9EA",
        theme_color: "#660000",
        icon: "src/favicon.png",
      },
    },
  ],
}
