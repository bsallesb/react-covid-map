import { useEffect, useMemo, useState } from 'react';
import { RecordType } from '../../@types/RecordType';
import { capitalizeWords, formatDate } from '../../helpers';
import { useRecords } from '../../hooks/RecordsContext';
import { TableContainer } from './styles';

const Table: React.FC = () => {
    const [showTable, setShowTable] = useState(false);
    const [showAccumulated, setShowAccumulated] = useState(false);

    const { records, record, date, location, isLoading } = useRecords();

    const accumulatedRecord = useMemo(() => {
        if (!date) return record;
        const dates = Object.keys(records);

        const result: RecordType = {};

        dates.every(d => {
            const currentRecord = records[d];

            Object.keys(currentRecord).forEach(variant => {
                if (!result[variant]) {
                    result[variant] = {
                        num_sequences: 0,
                        num_sequences_total: 0,
                        perc_sequences: 0,
                    };
                }

                result[variant].num_sequences +=
                    currentRecord[variant].num_sequences;

                result[variant].num_sequences_total +=
                    currentRecord[variant].num_sequences_total;

                result[variant].perc_sequences =
                    (result[variant].num_sequences /
                        result[variant].num_sequences_total) *
                    100;
            });

            if (date === d) {
                return false;
            }
            return true;
        });

        return result;
    }, [records, date, record]);

    const rowsCount = useMemo(() => {
        if (!record || !location || !date) return 0;

        return Object.keys(
            showAccumulated ? (accumulatedRecord as RecordType) : record
        ).length;
    }, [accumulatedRecord, date, location, record, showAccumulated]);

    const selectedRecord = useMemo(
        () => (showAccumulated ? accumulatedRecord : record),
        [accumulatedRecord, record, showAccumulated]
    );

    useEffect(() => {
        setShowTable(true);
    }, [isLoading]);

    if (!record || !location) return null;

    return (
        <TableContainer className={showTable ? 'show' : ''}>
            <div className="d-flex justify-content-between">
                <h2>
                    {capitalizeWords(location)}{' '}
                    {date && (
                        <span className="fs-6 fw-normal text-muted">
                            {formatDate(date)}
                        </span>
                    )}
                </h2>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowTable(false)}
                />
            </div>

            {isLoading && <div className="spinner-grow text-primary" />}

            {!isLoading && (
                <>
                    <div className="form-check form-switch">
                        <label className="form-check-label" htmlFor="switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="switch"
                                checked={showAccumulated}
                                onChange={() =>
                                    setShowAccumulated(!showAccumulated)
                                }
                            />
                            Display accumulated values
                        </label>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Variant</th>
                                <th>Sequences</th>
                                <th>Percent</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowsCount > 0 &&
                                selectedRecord &&
                                Object.keys(selectedRecord).map(r => (
                                    <tr key={r}>
                                        <td>{r}</td>
                                        <td>
                                            {selectedRecord[r].num_sequences}
                                        </td>
                                        <td>
                                            {Number(
                                                selectedRecord[
                                                    r
                                                ].perc_sequences.toFixed(2)
                                            )}
                                            %
                                        </td>
                                        <td>
                                            {
                                                selectedRecord[r]
                                                    .num_sequences_total
                                            }
                                        </td>
                                    </tr>
                                ))}
                            {!rowsCount && (
                                <tr>
                                    <td colSpan={4}>No data found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </TableContainer>
    );
};

export default Table;
