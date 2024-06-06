import { style, globalStyle } from "@vanilla-extract/css"
import { theme } from "./theme.css"

export const blogPost = style({
  fontSize: theme.fontSizes[3],
})

globalStyle(`${blogPost} img`, {
  maxWidth: "100%",
  height: "auto",
})

globalStyle(`${blogPost} a`, {
  color: "inherit",
  fontWeight: theme.fontWeights.medium,
})

const containedElements = [
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "pre",
  "ul",
  "ol",
  "dl",
]
  .map((el) => blogPost + " " + el)
  .join(", ")

globalStyle(containedElements, {
  maxWidth: theme.sizes.tight,
  marginLeft: "auto",
  marginRight: "auto",
})

globalStyle(`${blogPost} table`, {
  marginTop: theme.space[5],
  marginBottom: theme.space[6],
  textAlign: "left",
  width: theme.sizes.tight,
  marginLeft: "auto",
  marginRight: "auto",
  borderCollapse: "collapse",
  tableLayout: "fixed",
  borderRadius: "5px",
  borderStyle: "hidden",
  overflow: "hidden",
  boxShadow: "rgb(174, 193, 204) 0px 0px 0px 1px",
})

globalStyle(`${blogPost} th, ${blogPost} td`, {
  padding: `${theme.space[2]} ${theme.space[3]}`,
  border: `1px solid rgb(174, 193, 204)`
})

globalStyle(`${blogPost} th`, {
  background: theme.colors.lighttextsecondary,
  fontWeight: theme.fontWeights.medium,
})

globalStyle(`${blogPost} p`, {
  lineHeight: theme.lineHeights.text,
})


globalStyle(`${blogPost} h2`, {
  fontSize: theme.fontSizes[5],
  fontWeight: theme.fontWeights.bold,
  marginTop: theme.space[6],
})

globalStyle(`${blogPost} h3`, {
  fontSize: theme.fontSizes[4],
  fontWeight: theme.fontWeights.bold,
  marginTop: theme.space[5],
})

globalStyle(`${blogPost} h4`, {
  fontSize: theme.fontSizes[3],
  fontWeight: theme.fontWeights.bold,
})

globalStyle(`${blogPost} h5, ${blogPost} h6`, {
  fontSize: theme.fontSizes[2],
  fontWeight: theme.fontWeights.bold,
})
