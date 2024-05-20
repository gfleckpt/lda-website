import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Layout from "../components/layout"
import {
    Container,
    FlexList,
    Box,
    Heading,
    Space,
    Section,
    Flex,
    Icon,
    Kicker,
    Subhead,
    Text
} from "../components/ui"

import SEOHead from "../components/head"
import { theme } from "../theme.css"
import { colors } from "../colors.css"
import Dot from "../components/dot"


const AccordionItem = ({ title, description }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Box center onClick={() => setIsOpen(!isOpen)}
            style={{
                cursor: "pointer",
                borderTop: isOpen ? `1px solid ${colors.terciary}` : "1px solid #dbd9d2",
            }}
        >
            <Box style={{ marginBottom: "0", padding: `${theme.space[4]} 0`, backgroundColor: isOpen ? "#f9f0da" : "transparent", transition: "background-color 0.1s ease-in-out", }}>
                <Kicker style={{ marginBottom: "0" }}>
                    {title}
                </Kicker>
            </Box>
            {isOpen &&
                <Text style={{
                    borderTop: `1px solid ${colors.terciary}`,
                    borderBottom: `1px solid ${colors.terciary}`,
                    margin: "0", padding: theme.space[4],
                    backgroundColor: isOpen ? "#fdf9f2" : "transparent",
                    transition: "background-color 0.1s ease-in-out",
                }}>{description}</Text>
            }
        </Box>
    );
};

function Vantagem(props) {
    return (
        <Box as="li" width="full" padding={4} paddingY={3} center>
            <Flex>

                {props.image && (
                    <Icon
                        alt={props.image.alt}
                        image={props.image.gatsbyImageData}
                        size="small"
                    />
                )}
                <Subhead variant="small">{props.name}</Subhead>
            </Flex>
        </Box>
    )
}

function SectoresDeActividade(props) {
    return (
        <Box as="li" width="third" padding={4} paddingY={3} center>
            <Flex>
                {/* <Dot/> */}
                {/* {props.image && ( */}
                {/* <Icon
                        alt={props.image.alt}
                        image={props.image.gatsbyImageData}
                        size="small"
                    /> */}
                {/* )} */}
                <Subhead variant="small">{props.name}</Subhead>
            </Flex>
        </Box>
    )
}

export default function AreasDeAtuacao(props) {
    const data = useStaticQuery(graphql`
    query {
        allContentfulAreasDeAtuacao {
            edges {
              node {
                id
                titulo
                childContentfulAreasDeAtuacaoDescricaoTextNode {
                  descricao
                }
                particulares
              }
            }
        }
        allContentfulVantagens {
            edges {
              node {
                id
                name
                image {
                    id
                    gatsbyImageData
                    alt
                }
              }
            }
        }
        allContentfulSectoresDeActividade(sort: {name: ASC}) {
            edges {
              node {
                id
                name
              }
            }
          }
    }
  `);

    const areasDeAtuacao = data.allContentfulAreasDeAtuacao.edges.map(edge => edge.node);
    const particulares = areasDeAtuacao.filter(area => area.particulares);
    const empresas = areasDeAtuacao.filter(area => !area.particulares);
    const vantagens = data.allContentfulVantagens.edges.map(edge => edge.node);
    const sectoresDeActividade = data.allContentfulSectoresDeActividade.edges.map(edge => edge.node);


    return (
        <Layout>
            <Section style={{ background: theme.colors.secondary, color: theme.colors.lighttext, paddingLeft: "0", paddingRight: "0" }}>
                <Container>
                    <Heading center>Áreas de Atuação</Heading>
                    <Space size={4} />
                    <Text center>Na Lacerda Dias & Associados prestamos apoio jurídico de excelência. A nossa equipa está segmentada em vários departamentos e atua em diversas áreas de prática do Direito, tendo em conta as necessidades dos nossos clientes, tanto Particulares como Empresas.</Text>
                </Container>

            </Section>
            <Container>
                <Box paddingY={5}>
                    <Space size={5} />
                    <FlexList gap={6} variant="start" responsive>
                        <Box id="particulares">
                            <Subhead center>Particulares</Subhead>
                            <Space size={4} />
                            {particulares.map(area => (
                                <li key={area.id}>
                                    <AccordionItem
                                        title={area.titulo}
                                        description={area.childContentfulAreasDeAtuacaoDescricaoTextNode.descricao}
                                    />
                                </li>
                            ))}
                        </Box>
                        <Box id="empresas">
                            <Subhead center>Empresas</Subhead>
                            <Space size={4} />
                            {empresas.map(area => (
                                <li key={area.id}>
                                    <AccordionItem
                                        title={area.titulo}
                                        description={area.childContentfulAreasDeAtuacaoDescricaoTextNode.descricao}
                                    />
                                </li>
                            ))}
                        </Box>
                    </FlexList>

                    <Space size={5} />

                    <Flex variant="centerColumn">
                        <Subhead center>Vantagens</Subhead>
                        <FlexList gutter={3} variant="start" responsive wrap>
                            {vantagens.map((vantagem) => (
                                <Vantagem key={vantagem.id} {...vantagem} />
                            ))}
                        </FlexList>
                    </Flex>

                    <Space size={6} />

                    <Box paddingY={2}>
                        <Heading center>Sectores de Actividade</Heading>
                        <Space size={4} />
                        <Text center >
                            A sociedade tem forte experiência na assessoria jurídica permanente a empresas e outras organizações, nas principais áreas inerentes aos seus ramos de atividade e nos vários sectores de atividade. O know-how, traduzido na capacidade de orientação e acompanhamento regular aos principais interlocutores é reconhecido como uma mais-valia pelos seus clientes.
                        </Text>
                        <Space size={4} />

                        <FlexList gutter={3} variant="start" responsive wrap>
                            {sectoresDeActividade.map((sectores) => (
                                <SectoresDeActividade key={sectores.id} {...sectores} />
                            ))}
                        </FlexList>
                        <Space size={5} />
                    </Box>
                </Box>
            </Container>
        </Layout>
    )
}
export const Head = (props) => {
    // const { posts } = props.data
    return <SEOHead title="Áreas de Atuação" />
}

