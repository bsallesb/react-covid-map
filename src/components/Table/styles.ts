import styled from 'styled-components';

export const TableContainer = styled.div`
    position: absolute;
    top: 50%;
    right: 60px;
    width: 600px;
    max-width: 100%;
    height: 400px;
    padding: 15px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    transform: translateY(-50%) translateX(120%);
    overflow-y: auto;

    transition: all 500ms cubic-bezier(0, 0, 0.58, 1);
    transition-timing-function: cubic-bezier(0, 0, 0.58, 1);

    &.show {
        transform: translate(0, -50%);
    }

    @media (max-width: 767px) {
        display: none;
        position: static;
        top: auto;
        right: auto;
        width: calc(100% - 30px);
        height: auto;
        margin: 0 15px;
        padding: 15px;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        transform: none;
        overflow-y: inherit;

        &.show {
            display: block;
            transform: none;
        }
    }
`;
