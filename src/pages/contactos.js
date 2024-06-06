import React, { useState } from "react";
import Layout from "../components/layout"
import {
    Container,
    Box,
    Heading,
    Space,
    Flex,
    Text
} from "../components/ui"

import SEOHead from "../components/head"
import ReCAPTCHA from "react-google-recaptcha";

const styles = {
    iframeContainer: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxWidth: "580px",
        maxHeight: "580px",
        paddingTop: "100%", // 1:1 Aspect Ratio
        margin: "0 auto" // Center the iframe horizontally
    },
    iframe: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: 0,
    },
    iframeWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
};

export default function Contactos(props) {
    const [recaptchaValue, setRecaptchaValue] = useState(null);

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!recaptchaValue) {
            alert("Please complete the reCAPTCHA");
            return;
        }

        // Your form data
        const formData = {
            // Add your other form fields here
            token: recaptchaValue,
        };

        try {
            const response = await fetch("/api/verifyRecaptcha", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                alert("Form submitted successfully");
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form");
        }
    };


    return (
        <Layout>
            <Container>
                <Space size={5} />
                <Heading as="h1">Contacte-nos</Heading>
                <Space size={3} />
                <Flex responsive>
                    <Box>
                        <form className="cf" onSubmit={handleSubmit}>
                            <input type="text" id="input-name" name="nome" placeholder="Nome" required />
                            <input type="text" id="input-empresa" name="empresa" placeholder="Empresa" />
                            <input type="email" id="input-email" name="email" placeholder="Endereço de Email" />
                            <input type="text" id="input-contacto" name="contacto" placeholder="Contacto Telefónico" />
                            <textarea id="input-message" type="text" name="mensagem" placeholder="Mensagem" required></textarea>
                            <Space size={3} />
                            <Box>
                                {/* Add reCAPTCHA here */}
                                <ReCAPTCHA
                                    sitekey={process.env.RECAPTCHA_KEY}
                                    onChange={handleRecaptchaChange}
                                />
                            </Box>
                            <Space size={3} />
                            <input type="submit" value="Enviar" id="input-submit" />
                        </form>
                    </Box>
                    <Space size={3} />
                    <Box>
                        <Box style={styles.iframeWrapper}>
                            <div style={styles.iframeContainer}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3082.758954298506!2d-9.139569223668785!3d39.406959116476926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd18b37dd7d1993d%3A0xc109a7f4b677eaf9!2sLacerda%20Dias%20%26%20Associados%20%E2%80%A2%20Sociedade%20de%20Advogados%20R.L.!5e0!3m2!1spt-PT!2spt!4v1716138186406!5m2!1spt-PT!2spt"
                                    style={styles.iframe}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Maps"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </Box>
                        <Space size={2} />
                        <Text>*Proximidade do Parque de Estacionamento Subterrâneo na Praça 25 de Abril/Tribunal da Comarca</Text>
                    </Box>
                </Flex>
                <Space size={5} />
            </Container>
        </Layout>
    )
}
export const Head = (props) => {
    // const { posts } = props.data
    return <SEOHead
    title="Lacerda Dias & Associados | Contactos"
    description="A Lacerda Dias & Associados é uma sociedade de advogados independente, vocacionada para o apoio jurídico aos particulares, para a assessoria a empresas e demais organizações, reconhecida pelo seu know-how e pelos resultados apresentados ao cliente."
    recaptcha
    />
}

