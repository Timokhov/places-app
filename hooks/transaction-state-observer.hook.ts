import { useEffect } from 'react';
import { Nullable } from '../models/nullable';
import { ProgressionState } from '../models/ProgressionState';
import { usePreviousValue } from './previous-value.hook';

export const useProgressionStateObserver = (
    progression: ProgressionState,
    onStart?: () => void,
    onSuccess?: () => void,
    onError?: (error: string) => void ) =>
{
    const prevProgressionState: Nullable<ProgressionState> = usePreviousValue(progression);

    useEffect(() => {
        if (!prevProgressionState?.inProgress && progression?.inProgress) {
            onStart && onStart();
        }

        if (prevProgressionState?.inProgress && !progression?.inProgress) {
            if (progression.error) {
                onError && onError(progression.error);
            } else {
                onSuccess && onSuccess();
            }
        }
    }, [progression]);
};
