import { useEffect } from 'react';
import { Nullable } from '../models/nullable';
import { TransactionState } from '../models/TransactionState';
import { usePreviousValue } from './previous-value.hook';

export const useTransactionStateObserver = (
    transactionState: TransactionState,
    onStart?: () => void,
    onSuccess?: () => void,
    onError?: (error: string) => void ) =>
{
    const prevTransactionState: Nullable<TransactionState> = usePreviousValue(transactionState);

    useEffect(() => {
        if (!prevTransactionState?.inProgress && transactionState?.inProgress) {
            onStart && onStart();
        }

        if (prevTransactionState?.inProgress && !transactionState?.inProgress) {
            if (transactionState.error) {
                onError && onError(transactionState.error);
            } else {
                onSuccess && onSuccess();
            }
        }
    }, [transactionState]);
};
