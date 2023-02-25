import { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useSetUser } from "../context/UserContext";
import { AppShell, LoadingOverlay } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import HeaderSearch from "../components/Header/HeaderSearch";
import UserFile from "../components/UserButton/UserFile";
import { Logo } from "../components/Header/Logo";
import UserMAccount from "../components/UserButton/UserMAccount";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState("Profile");
  const setUser = useSetUser();
  const [ userFile, setUserFile] = useState([])
  const [ account, setAccount ] = useState([])

  useEffect(() => {
    (async () => {
      const MretsAccount = await fetch("/api/mrets/account");
      const MretsAccountJson = await MretsAccount.json();
      const getUser = await fetch("/api/user");
      const getUserJson = await getUser.json();
      setUser(getUserJson)
      setUserFile(getUserJson);
      setAccount(MretsAccountJson);
      
        
        
       

      setIsLoading(false);
    })();
  }, );

  return (
    <AppShell
       header={<HeaderSearch  />}
      navbar={<Navbar page={page} setPage={setPage} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <LoadingOverlay visible={isLoading} />
      <UserFile userFile={userFile} setUserFile={setUserFile} />
      <UserMAccount></UserMAccount>
    </AppShell>
  );
}

export const getServerSideProps = withPageAuthRequired();
