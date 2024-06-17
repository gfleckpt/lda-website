// support for .env, .env.development, and .env.production
require("dotenv").config()
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://lacerdadiasassociados.pt",
    title: "Lacerda Dias e Associados | Sociedade de Advogados S.P.R.L.",
    author: `G-Fleck`,
    description: "A Lacerda Dias & Associados é uma sociedade de advogados independente, vocacionada para o apoio jurídico aos particulares, para a assessoria a empresas e demais organizações, reconhecida pelo seu know-how e pelos resultados apresentados ao cliente.",
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
        allowList: ["RECAPTCHA_KEY", "RECAPTCHA_SECRET_KEY", "EMAIL_TEMPLATE_ID", "EMAIL_SERVICE_ID", "EMAIL_PUBLIC_KEY"]
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Lacerda Dias e Associados | Sociedade de Advogados S.P.R.L.",
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
