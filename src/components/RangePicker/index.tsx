import { useCallback, useEffect, useMemo, useState } from 'react';

import { formatDate } from '../../helpers';
import { useRecords } from '../../hooks/RecordsContext';
import { RangeContainer, RangeInput, RangeTooltip } from './styles';

const RangePicker: React.FC = () => {
    const [rangeValue, setRangeValue] = useState(0);

    const { records, date, hasError, setRecord, setDate } = useRecords();

    useEffect(() => {
        setRangeValue(0);
    }, [records]);

    const rangeLength = useMemo(
        () =>
            Object.keys(records).length > 1
                ? Object.keys(records).length - 1
                : 0,
        [records]
    );

    const tooltipDirection = useMemo(
        () => (rangeValue > rangeLength / 2 ? 'right' : 'left'),
        [rangeLength, rangeValue]
    );

    const tooltipPosition = useMemo(() => {
        const amount = (100 / rangeLength) * rangeValue;
        return tooltipDirection === 'right' ? 100 - amount : amount;
    }, [rangeLength, rangeValue, tooltipDirection]);

    const handleChangeValue = useCallback(
        (value: string) => {
            setRangeValue(Number(value));
            setRecord(records[Object.keys(records)[Number(value)]]);
            setDate(Object.keys(records)[Number(value)]);
        },
        [records, setDate, setRecord]
    );

    if (hasError) {
        return (
            <div className="container">
                <div className="alert alert-danger" role="alert">
                    An error occurred while trying to load the information.
                    Please try to select another country
                </div>
            </div>
        );
    }

    return (
        <section className="pt-5">
            <RangeContainer className="container">
                <RangeInput
                    type="range"
                    className="form-range"
                    min={0}
                    max={rangeLength}
                    value={rangeValue}
                    onChange={e => handleChangeValue(e.target.value)}
                />
                {date && (
                    <RangeTooltip
                        position={tooltipPosition}
                        direction={tooltipDirection}
                    >
                        {formatDate(date)}
                    </RangeTooltip>
                )}
            </RangeContainer>
        </section>
    );
};

export default RangePicker;
