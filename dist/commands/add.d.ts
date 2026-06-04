type ResourceType = 'skill';
export declare function addCommand(type: ResourceType, name: string, cwd: string): Promise<void>;
export declare function listSkills(): Promise<string[]>;
export {};
