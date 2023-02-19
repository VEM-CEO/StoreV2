import { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useSetUser } from "../context/UserContext";
import { AppShell, LoadingOverlay } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import HeaderSearch from "../components/Header/HeaderSearch";
import UserFile from "../components/UserButton/UserFile";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState("Profile");
  const setUser = useSetUser();
  const [ userFile, setUserFile] = useState([])

  useEffect(() => {
    (async () => {
      const getUser = await fetch("/api/user");
      const getUserJson = await getUser.json();
      setUser(getUserJson)
      setUserFile(getUserJson);



      setIsLoading(false);
    })();
  },);

  return (
    <AppShell
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
      
    </AppShell>
  );
}

export const getServerSideProps = withPageAuthRequired();
