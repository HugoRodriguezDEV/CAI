type Tool = 'claude' | 'gemini';
type ResourceType = 'skill' | 'agent';
export declare function addCommand(tool: Tool, type: ResourceType, name: string, cwd: string): Promise<void>;
export declare function listResources(type: ResourceType): Promise<string[]>;
export {};
