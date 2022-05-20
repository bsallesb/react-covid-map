/* eslint-disable camelcase */
export type RecordType = {
    // key: Variant
    [key: string]: {
        num_sequences: number;
        perc_sequences: number;
        num_sequences_total: number;
    };
};
