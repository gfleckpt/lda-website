import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import {
  Container,
  FlexList,
  Box,
  Heading,
  Space,
  Button
} from "../components/ui"
import {
  PostCardSmall
} from "../components/post-card"
import SEOHead from "../components/head"

const POSTS_PER_PAGE = 12

export default function Noticias(props) {
  const posts = props.data.allContentfulBlogPost.nodes

  const [currentPage, setCurrentPage] = React.useState(0)

  const startIndex = currentPage * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const visiblePosts = posts.slice(startIndex, endIndex)

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1)
  }

  return (
    <Layout>
      <Container style={{ minHeight: "650px" }}>
        <Box paddingY={4}>
          <Heading as="h1">Artigos de Interesse</Heading>
          <Space size={4}></Space>
          <FlexList variant="start" gap={0} gutter={3} responsive wrap>
            {visiblePosts.map((post) => (
              <Box as="li" key={post.id} padding={4} paddingY={4} width="third">
                <PostCardSmall {...post} />
              </Box>
            ))}
          </FlexList>
          <Space size={4}></Space>
          <Box paddingY={4} center>

            <FlexList>
              <Button onClick={prevPage} variant="header" disabled={currentPage === 0}>{"<"}</Button>
              <Button onClick={nextPage} variant="header" disabled={endIndex >= posts.length}>{">"}</Button>
            </FlexList>
          </Box>

        </Box>
      </Container>
    </Layout>
  )
}
export const Head = (props) => {
  // const { posts } = props.data
  return <SEOHead
    title="Lacerda Dias & Associados | Artigos de Interesse"
    description="A Lacerda Dias & Associados é uma sociedade de advogados independente, vocacionada para o apoio jurídico aos particulares, para a assessoria a empresas e demais organizações, reconhecida pelo seu know-how e pelos resultados apresentados ao cliente."
  />
}

export const query = graphql`
  query {
    allContentfulBlogPost(sort: {date: DESC}) {
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
