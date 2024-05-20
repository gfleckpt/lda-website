import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Container,
  Section,
  Flex,
  Box,
  Subhead,
  Kicker,
  Text,
  ButtonList,
} from "./ui"
import { colors } from "../colors.css"

export default function Feature(props) {
  return (
    <Section padding={4} background="secondary" style={{paddingTop:"2rem"}}>
      <Container>
        <Flex gap={4} variant="responsive">
          <Box width="half" order={props.flip ? 1 : null}>
            {props.image && (
              <GatsbyImage
                alt={props.image.alt}
                image={getImage(props.image.gatsbyImageData)}
              />
            )}
          </Box>
          <Box width="half">
            <Subhead style={{textTransform: "uppercase"}}>
              {props.kicker && <Kicker>{props.kicker}</Kicker>}
              {props.heading}
            </Subhead>
            <Text variant="lead" style={{color: colors.lighttextsecondary}}>{props.text}</Text>
            <ButtonList links={props.links} />
          </Box>
        </Flex>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageFeatureContent on HomepageFeature {
    id
    kicker
    heading
    text
    image {
      id
      gatsbyImageData
      alt
    }
  }
`
