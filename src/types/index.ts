export interface Response<T> {
    code: number;
    data?: T;
    msg?: string;
    ts: number;
    total?: number;
}
