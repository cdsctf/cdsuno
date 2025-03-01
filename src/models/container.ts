export interface Container {
    image: string;
    cpu_limit: number;
    memory_limit: number;
    envs: Record<string, string>;
    ports: Array<number>;
}
