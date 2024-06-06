import React, { useState } from 'react';
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Container,
  Section,
  FlexList,
  Box,
  Heading,
  Text,
  Space,
  Kicker,
  Flex,
  Link
} from "./ui"
import {
  Mail,
  Linkedin
} from "react-feather"
import { theme } from "../theme.css"


function Benefit({ image, heading, position, text, email, linkedin }) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Handles clicking outside the modal content to close the modal
  const handleOutsideClick = (event) => {
    if (event.target.id === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  const positionMap = {
    "Catarina Luís": "center 10%",
    "Rita Baptista": "center 20%",
  };

  const handlePosition = positionMap[heading] || "center 30%"; // Default value if heading doesn't match any key

  return (
    <Box as="li" width="half" padding={4} paddingY={4}>
      <Box width="full">
        {image && (
          <GatsbyImage
            alt={image.alt}
            image={getImage(image.gatsbyImageData, {
              layout: "constrained",
              aspectRatio: 2 // Adjust this value based on the desired width-to-height ratio
            })}
            style={{ maxHeight: "17em", width: "auto" }} // Optionally control the size here
            objectPosition={handlePosition}
          />
        )}
      </Box>
      <Space size={3} />
      <Heading variant="subheadSmall" style={{ marginBottom: theme.space[2] }}>{heading}</Heading>
      <Kicker>{position}</Kicker>
      <hr />
      <Space size={2} />
      <Text>{text.excerpt}</Text>
      <span
        onClick={toggleModal}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleModal(); }}
        role="button"
        tabIndex="0"
        style={{ color: "#993333", cursor: "pointer" }}
      >
        Ver Biografia Completa
      </span>
      {isModalOpen && (
        <Flex
          id="modal-overlay"
          onClick={handleOutsideClick}
          onKeyDown={(e) => { if (e.key === 'Escape') setIsModalOpen(false); }}
          tabIndex="-1"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '8px',
              maxWidth: '700px',
              width: '90%',
              maxHeight: '90%',
              overflowY: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            <Heading variant="subhead" style={{ marginBottom: theme.space[2] }}>{heading}</Heading>
            <Kicker>{position}</Kicker>
            <Space size={4} />
            <div dangerouslySetInnerHTML={{ __html: text.html }} />
            <Space size={5} />
            {email &&
              <Flex>
                <Mail />
                <Link to={`mailto:${email}`}>{email}</Link>
              </Flex>
            }
            <Space size={3} />
            {linkedin &&
              <Flex>
                <Linkedin />
                <Link to={linkedin} target="_blank">{linkedin}</Link>
              </Flex>
            }

            <button onClick={toggleModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: '#333', // Change as needed
                fontSize: '1rem'
              }}>X</button>
          </div>
        </Flex>
      )}
    </Box>
  );
}

export default function BenefitList() {
  const data = useStaticQuery(graphql`
    query {
      homepageBenefitList {
        id
        text
        heading
        content {
          id
          heading
          image {
            alt
            gatsbyImageData
            id
          }
          position
          email
          linkedin
        }
      }
      allMarkdownRemark {
        edges {
          node {
            id
            html
            parent {
              id
              parent {
                id
              }
            }
            excerpt(pruneLength: 120)
          }
        }
      }
    }
  `);

  // Create a mapping of IDs to HTML content
  const markdownMap = {};
  data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.parent && node.parent.parent) {
      markdownMap[node.parent.parent.id] = {
        html: node.html,
        excerpt: node.excerpt
      }; // Store both HTML and excerpt using the grandparent's ID as the key
    }
  });

  // Combine data
  const benefits = data.homepageBenefitList.content.map(benefit => ({
    ...benefit,
    text: markdownMap[benefit.id],  // Associate Markdown HTML
    image: benefit.image,
  }));

  return (
    <Section id="equipa">
      <Container>
        <Box center>
          {data.homepageBenefitList.heading && <Heading>{data.homepageBenefitList.heading}</Heading>}
          {data.homepageBenefitList.text && <Text variant="lead">{data.homepageBenefitList.text}</Text>}
        </Box>
        <Space size={3} />
        <FlexList gutter={3} variant="start" responsive wrap>
          {benefits.map((benefit, index) => (
            <Benefit key={index} {...benefit} />
          ))}
        </FlexList>
      </Container>
    </Section>
  );
}

