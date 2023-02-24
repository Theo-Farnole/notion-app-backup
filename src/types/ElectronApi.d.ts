import { BackupMetadata } from "./BackupMetadata";

export interface ElectronApi {
    openFile: () => Promise<string>;
    storage: {
        backups: {
            add: (backupMetadata: BackupMetadata) => Promise<void>;
            remove: (backupMetadata: BackupMetadata) => Promise<void>;
            get: () => Promise<void>;
        },
        apiKeys: {
            set: (apiKeys: string[]) => Promise<void>;
            get: () => Promise<void>;
        },
        updateEvent: {
            on: (callback: any) => void,
            removeListener: (callback: any) => void
        }
    }
}