export type LeanDocument<T> = (T & {_id: string} & Required<{_id: string}>);