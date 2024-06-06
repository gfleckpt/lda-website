import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import SEOHead from "../components/head"
import { FlexList, Box, Container, Button, Heading, Space } from "../components/ui"
import { PostCardSmall } from "../components/post-card"


export default function Homepage(props) {
  const { homepage } = props.data
  const posts = props.data.allContentfulBlogPost.nodes

  return (
    <Layout>
      {homepage.blocks.map((block) => {
        const { id, blocktype, ...componentProps } = block
        const Component = sections[blocktype] || Fallback
        return <Component key={id} {...componentProps} />
      })}
      <Container style={{ marginTop: "5rem", marginBottom: "5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Heading>Artigos de Interesse</Heading>
        <Space size={4}></Space>
        <FlexList responsive wrap gap={0} gutter={3} variant="start">
          {posts.map((post) => (
            <Box as="li" key={post.id} padding={3} width="quarter">
              <PostCardSmall {...post} />
            </Box>
          ))}
        </FlexList>
        <Space size={3}></Space>
        <div><Button to="/artigos-de-interesse" variant="different">Ver Mais</Button></div>
      </Container>
    </Layout>
  )
}
export const Head = (props) => {
  const { homepage } = props.data
  return <SEOHead {...homepage} />
}
export const query = graphql`
  {
    homepage {
      id
      title
      description
      image {
        id
        url
      }
      blocks: content {
        id
        blocktype
        ...HomepageHeroContent
        ...HomepageLogoListContent
        ...HomepageProductListContent
        ...HomepageFeatureListContent
      }
    }
    allContentfulBlogPost(limit: 4, sort: {date: DESC}) {
      nodes {
        id
        slug
        title
        excerpt
        date
      }
    }
  }
`

// ...HomepageStatListContent...HomepageCtaContent