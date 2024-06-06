import * as React from "react"

export default function Head({ title, recaptcha, description, excerpt, image, artigo }) {

  const normalizedTitle = artigo ? title + " | Lacerda Dias & Associados" : title
  const normalizedDescription = artigo ? excerpt : description
  const descriptionOrExcerpt = description || excerpt
  return (
    <>
      <meta charSet="utf-8" />
      <title>{normalizedTitle}</title>
      {descriptionOrExcerpt && (
        <meta
          name="description"
          property="og:description"
          content={normalizedDescription}
        />
      )}
      <meta property="og:title" content={normalizedTitle} />
      {image && <meta property="og:image" content={image.url} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={normalizedTitle} />
      {descriptionOrExcerpt && <meta name="twitter:description" content={normalizedDescription} />}
      {image && <meta name="twitter:image" content={image.url} />}
      {recaptcha && <script src="https://www.google.com/recaptcha/api.js" async defer></script>}
    </>
  )
}
