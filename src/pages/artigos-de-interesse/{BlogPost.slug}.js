import * as React from "react"
import Layout from "../../components/layout"
import { graphql } from "gatsby"

import {
  Container,
  Box,
  Space,
  Heading,
  Kicker,
} from "../../components/ui"
import * as styles from "../../blog-post.css"
import SEOHead from "../../components/head"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { theme } from "../../theme.css"

export default function BlogPost(props) {
  const {blogPost} = props.data
  const formattedDate = format(new Date(blogPost.date), "MMMM d, yyyy", { locale: ptBR })

  return (
    <Layout>
      <Container>
        <Box paddingY={5}>
          <Heading as="h1" center>
            {blogPost.title}
          </Heading>
          <Space size={4} />
          <Space size={4} />
          <Kicker center  style={{color:theme.colors.secondary}}>{formattedDate}</Kicker>
          <Space size={4} />
          <Space size={5} />
          <div
            className={styles.blogPost}
            dangerouslySetInnerHTML={{
              __html: blogPost.html,
            }}
          />
        </Box>
      </Container>
    </Layout>
  )
}
export const Head = (props) => {
  const { blogPost } = props.data
  return <SEOHead artigo {...blogPost} />
}

export const query = graphql`
  query ($id: String!) {
    blogPost(id: { eq: $id }) {
      id
      slug
      title
      html
      excerpt
      date
    }
  }
`