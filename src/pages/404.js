import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import {
  Container,
  Box,
  Heading,
  Space,
  Kicker,
  NavLink
} from "../components/ui"
import SEOHead from "../components/head"


export default function NotFound(props) {


  return (
    <Layout>
      <Container style={{ minHeight: "650px" }}>
        <Box paddingY={4}>
          <Heading as="h1">Página Não Encontrada</Heading>
           <Space size={4}></Space>
           <Kicker>A página que estás à procura não existe no nosso website.</Kicker>
           <Space size={4}></Space>
        <NavLink to="/">{"<"}- Voltar</NavLink>
        </Box>
      </Container>
    </Layout>
  )
}
export const Head = (props) => {
  return <SEOHead title="Lacerda Dias & Associados | Página Não Existe" />
}

