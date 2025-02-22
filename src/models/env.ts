export interface Env {
    image: string;
    cpu_limit: number;
    memory_limit: number;
    duration: number;
    envs: Record<string, string>;
    ports: Array<number>;
}
