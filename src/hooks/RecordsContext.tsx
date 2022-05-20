/* eslint-disable camelcase */
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { RawRecordType } from '../@types/RawRecord';
import { RecordType } from '../@types/RecordType';
import { WithChildren } from '../@types/WithChildren';

import Supabase from '../services/Supabase';

type GroupedDataType = {
    // Key: date
    [key: string]: RecordType;
};

interface IRecordsContextProps {
    records: GroupedDataType;
    record: RecordType | null;
    location: string;
    date: string | null;
    isLoading: boolean;
    hasError: boolean;
    getRawRecords: (location: string) => void;
    setDate: (date: string) => void;
    setRecord: (record: RecordType) => void;
    setLocation: (location: string) => void;
}

export const RecordsContext = createContext<IRecordsContextProps>(
    {} as IRecordsContextProps
);

export const useRecords = (): IRecordsContextProps => {
    const context = useContext(RecordsContext);

    if (!context) {
        throw new Error('useRecords must be within RecordsProvider');
    }

    return context;
};

const defaultLocation = process.env.REACT_APP_DEFAULT_COUNTRY ?? 'Brazil';

export const RecordsProvider: React.FC<WithChildren> = ({ children }) => {
    const { country } = useParams();

    const [rawRecords, setRawRecords] = useState<RawRecordType[]>([]);
    const [location, setLocation] = useState<string>(
        country ?? defaultLocation
    );
    const [record, setRecord] = useState<RecordType | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const getRawRecords = useCallback(async (_location: string) => {
        setLoading(true);
        setHasError(false);
        try {
            const { data, error } = await Supabase.from('country_records')
                .select('*')
                .ilike('location', _location);

            if (error) {
                setRawRecords([]);
                setHasError(true);
                return;
            }

            setRawRecords(data as RawRecordType[]);
        } catch (e) {
            setRawRecords([]);
            setHasError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getRawRecords(location);
    }, [getRawRecords, location]);

    const records = useMemo(() => {
        const groupedData: GroupedDataType = {};

        rawRecords.forEach(r => {
            if (!groupedData[r.date]) {
                groupedData[r.date] = {};
            }

            groupedData[r.date][r.variant] = {
                num_sequences: r.num_sequences,
                perc_sequences: r.perc_sequences,
                num_sequences_total: r.num_sequences_total,
            };
        });

        return Object.fromEntries(Object.entries(groupedData).sort());
    }, [rawRecords]);

    useEffect(() => {
        const sortedRecords = Object.fromEntries(
            Object.entries(records).sort()
        );

        setRecord(Object.values(sortedRecords)[0] ?? {});
        setDate(Object.keys(sortedRecords)[0] ?? null);
    }, [records]);

    const providerValue = useMemo(
        () => ({
            records,
            record,
            date,
            location,
            isLoading,
            hasError,
            getRawRecords,
            setRecord,
            setDate,
            setLocation,
        }),
        [records, record, date, location, isLoading, hasError, getRawRecords]
    );

    return (
        <RecordsContext.Provider value={providerValue}>
            {children}
        </RecordsContext.Provider>
    );
};
