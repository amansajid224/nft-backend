import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
    // define the part you're going to style
    container: {
        // ...
    },
    thumb: {
        bg: '#FFFFFF',
    },
    track: {
        bg: 'transparent',
        border:'1px solid',
        borderColor:'#FFFFFF',
        boxShadow:'none',
        _checked: {
            bg: '#9FC131',
            borderColor:'#9FC131',
            boxShadow:'none',
        },
    },
})

export const switchTheme = defineMultiStyleConfig({ baseStyle })