
import * as React from "react"
import {
    BlockLink,
    Kicker,
    Text
} from "../components/ui"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { theme } from "../theme.css"


export function PostCardSmall({ slug, title, excerpt, date, ...props }) {
    const formattedDate = format(new Date(date), "MMMM d, yyyy", { locale: ptBR })
    return (
        <BlockLink {...props} to={`/artigos-de-interesse/${slug}`}>
            <Text as="h4" variant="subheadSmall">
                <Kicker style={{color:theme.colors.secondary}}>{formattedDate}</Kicker>
                {title}
            </Text>
            <Text as="p">{excerpt}</Text>
        </BlockLink>
    )
}