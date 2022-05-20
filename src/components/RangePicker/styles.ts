import styled from 'styled-components';

type RangeTooltipType = {
    position: number;
    direction: 'left' | 'right';
};

export const RangeContainer = styled.div`
    position: relative;
    max-width: 600px;
    height: 24px;
`;

export const RangeTooltip = styled.div<RangeTooltipType>`
    position: absolute;
    top: -40px;
    right: ${props =>
        props.direction === 'right' ? `${props.position}%` : 'auto'};
    left: ${props =>
        props.direction === 'left' ? `${props.position}%` : 'auto'};
    display: inline-block;
    background-color: #000;
    padding: 5px 10px;
    border-radius: 3px;
    color: #fff;
`;

export const RangeInput = styled.input`
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: var(--color-primary);
    }
`;
