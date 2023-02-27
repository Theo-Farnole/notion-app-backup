import { BackupMetadata } from "./BackupMetadata";

export interface ElectronApi {
    openFile: () => Promise<string>;
    authorization: {
        getAuthorizationUrl: () => Promise<string>;
        event: {
            on: (callback: any) => void;
            removeListener: (callback: any) => void
        }
    },
    backup: {
        makeBackup: (backup: BackupMetadata) => Promise<void>;
    }
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