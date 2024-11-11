export interface Result<T> {
    code: number;
    data?: T;
    msg?: string;
    ts: number;
}
