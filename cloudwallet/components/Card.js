import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
    // define the part you're going to style
    container: {
        backgroundColor: '#241446',
        borderRadius: '16px',
    },
    header: {
    },
    body: {
        padding: '16px',
    },
    footer: {
    },
})

const sizes = definePartsStyle({
    md: {
        container: {
            borderRadius: '16px',
        },
    },
})

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes })