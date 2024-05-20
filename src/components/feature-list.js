import * as React from "react"
import { graphql } from "gatsby"
import { Container, Box, Kicker, Heading, Text, Space } from "./ui"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Feature from "./feature"
import { colors } from "../colors.css"


export default function FeatureList(props) {
  return (
    <Container width="fullbleed" id="sociedade">
      <Box background="secondary" radius="large">
        <Box center paddingY={5} style={{paddingLeft:"3em", paddingRight:"3em"}}>
          <Heading>
            {props.kicker && <Kicker>{props.kicker}</Kicker>}
            {props.heading}
          </Heading>
          <Space size={2} />
          {props.text && <Text style={{color: colors.lighttextsecondary}} variant="lead">{props.text}</Text>}
        </Box>
        <Box>
        {props.image && (
          <GatsbyImage
            alt={props.image.alt}
            image={getImage(props.image.gatsbyImageData)}
            style={{ maxHeight: "30em", width: "auto" }} // Optionally control the size here
          />
        )}
        </Box>
        {props.content.map((feature, i) => (
          <Feature key={feature.id} {...feature} flip={Boolean(i % 2)} />
        ))}
      </Box>
    </Container>
  )
}

export const query = graphql`
  fragment HomepageFeatureListContent on HomepageFeatureList {
    id
    kicker
    heading
    text
    image {
      alt
      gatsbyImageData
      id
    }
    content {
      id
      ...HomepageFeatureContent
    }
  }
`
