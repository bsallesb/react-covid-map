import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
        --color-primary: #e67e22;
    }

    * {
        font-family: 'Work Sans', sans-serif;
        &:focus { outline: none; }
    }
    .text-primary { color: var(--color-primary) !important; }
    .rsm-geographies path { cursor: pointer; }
`;
