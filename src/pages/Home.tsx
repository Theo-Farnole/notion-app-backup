import { Container, Divider } from '@mui/material';
import NewBackupFAB from '../components/Actions/NewBackupFAB';
import BackupList from '../components/Misc/BackupList';
import PageTextHeader from '../components/Text/PageTextHeader';
import { BackupMetadata } from '../types/BackupMetadata';

function Home() {
    const placeholders: BackupMetadata[] = [
        {
            workspace: {
                id: "897e5a76-ae52-4b48-9fdf-e71f5945d1af",
                name: "Le roi t'entends ?",
                avatarUrl: "https://i.discogs.com/tTmtyYgTh0jQfzvkKodLWuwn1G5faDH6AJ2Zr3uzIbA/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTM3ODE3/OS0xNTQwMzI2MDg1/LTg4NDYuanBlZw.jpeg",
            },
            savePath: "C:/something",
            lastBackupTimestamp: Date.now() - 60 * 60 * 1000
        },
        {
            workspace: {
                id: "aeb4587-456ef",
                name: "Putain ça bosse ou quoi",
                avatarUrl: "https://generasonrapfr.com/wp-content/uploads/2021/08/9A537A4E-E9F3-4417-8297-5150FBAA297D.jpeg",
            },
            savePath: "D:/sqdfhjqklsd/fsdf",
            lastBackupTimestamp: Date.now() - 1000
        }
    ]



    return <Container className="d-flex flex-column" sx={{ gap: 3 }}>

        <PageTextHeader
            className="mt-5"
            mainTitle='Hello !'
            subTitle='Checkout your latest backup and their progress.'
        />

        <Divider />

        <BackupList backupsMetadata={placeholders} />

        <NewBackupFAB />
    </Container>;
}

export default Home;
