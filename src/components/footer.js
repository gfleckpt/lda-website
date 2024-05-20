import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  Container,
  Flex,
  FlexList,
  Box,
  Space,
  NavLink,
  Text,
  VisuallyHidden,
  Subhead,
  NavLinkSecondary,
} from "./ui"
import BrandLogo from "./brand-logo"
import { colors } from "../colors.css"
import { theme } from "../theme.css"


export default function Footer() {
  const data = useStaticQuery(graphql`
    query {
      layout {
        footer {
          id
          links {
            id
            href
            text
          }
          meta {
            id
            href
            text
          }
          copyright
          morada
          codigoPostal
          telefone
          fax
          email
        }
      }
    }
  `)

  const { links, meta, copyright, morada, codigoPostal, telefone, fax, email } = data.layout.footer

  return (
    <Box as="footer" paddingY={4} background="secondary">
      <Container>
        <Flex variant="start" responsive>
          <NavLinkSecondary to="/">
            <VisuallyHidden>Homepage</VisuallyHidden>
            <BrandLogo width={160} />
          </NavLinkSecondary>
          <Space />
          <Flex variant="start" gap={5}>

            <Flex variant="columnStart">
              <Text variant="bold" style={{ textTransform: "uppercase" }}>Morada</Text>
              <Flex variant="columnStart" gap={0} style={{ color: colors.lighttextsecondary }}>
                <Text variant="small">{morada}</Text>
                <Text variant="small">{codigoPostal}</Text>
              </Flex>

            </Flex>

            <Flex variant="columnStart">

              <Text variant="bold" style={{ textTransform: "uppercase" }}>Contactos</Text>
              <Flex variant="columnStart" gap={0} style={{ color: colors.lighttextsecondary }}>
                <Text variant="small">Tel.: {telefone}</Text>
                <Text variant="small">Fax: {fax}</Text>
                <Text variant="small">E-mail: {email}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Space size={5} />
        <Flex variant="start" responsive>
          <FlexList variant="start" responsive>
            {links &&
              links.map((link) => (
                <li key={link.id}>
                  <NavLinkSecondary to={link.href}>{link.text}</NavLinkSecondary>
                </li>
              ))}
          </FlexList>
          <Space />
          <FlexList>
            {meta &&
              meta.map((link) => (
                <li key={link.id} style={{ color: colors.lighttextsecondary }}>
                  <NavLinkSecondary to={link.href}>
                    <Text variant="small">{link.text}</Text>
                  </NavLinkSecondary>
                </li>
              ))}
          </FlexList>
          <Text variant="small" style={{ color: colors.lighttextsecondary }}>{copyright}</Text>
        </Flex>
      </Container>
      <Space size={3} />
    </Box>
  )
}
