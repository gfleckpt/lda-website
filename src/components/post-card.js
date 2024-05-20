
import * as React from "react"
import {
    BlockLink,
    Kicker,
    Text
} from "../components/ui"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { theme } from "../theme.css"

// export function PostCard({ slug, title, excerpt, author, ...props }) {
//     return (
//         <BlockLink {...props} to={`/noticias/${slug}`}>
//             <Subhead>
//                 {title}
//             </Subhead>
//             <Text as="p">{excerpt}</Text>
//             {author?.name && (
//                 <Text variant="bold">
//                     <div>By {author.name}</div>
//                 </Text>
//             )}
//         </BlockLink>
//     )
// }

export function PostCardSmall({ slug, title, excerpt, date, ...props }) {
    const formattedDate = format(new Date(date), "MMMM d, yyyy", { locale: ptBR })
    return (
        <BlockLink {...props} to={`/noticias/${slug}`}>
            <Text as="h4" variant="subheadSmall">
                <Kicker style={{color:theme.colors.secondary}}>{formattedDate}</Kicker>
                {title}
            </Text>
            <Text as="p">{excerpt}</Text>
        </BlockLink>
    )
}