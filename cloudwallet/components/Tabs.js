import { tabsAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'
const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(tabsAnatomy.keys);

// define a custom variant
const simpleStyle = definePartsStyle((props) => {
    return {
        tab: {
            color: '#5C498E',
            fontSize: '16px',
            padding:'0 15px',
            marginBottom: '18px',
            _selected: {
                color: '#fff',
            },
            _hover: {
                color: '#fff',
            },
        },
        tablist: {
        },
        tabpanel: {
            padding:'0px'
        },
    }
})
const borderStyle = definePartsStyle((props) => {
    return {
        tab: {
            borderBottom: '2px solid',
            borderColor: 'transparent',
            fontSize: '20px',
            fontWeight: '600',
            textTransform:'uppercase',
            padding:'0 0 20px 0',
            margin:'0 50px 0 0',
            _selected: {
                borderBottom: '2px solid',
                borderColor: '9FC131',
                color: '#9FC131',
            },
            _hover: {
                color: '#9FC131',
                borderColor: '9FC131',
            },
        },
        tablist: {
            borderBottom: '1px solid',
            borderColor: '#35245A',
            marginBottom:'24px'
        },
        tabpanel: {
            padding:'0',
        },
    }
})

const variants = {
    simpleVariant: simpleStyle,
    borderVariant: borderStyle
}

// export the component theme
export const tabsTheme = defineMultiStyleConfig({ variants })
