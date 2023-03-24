import { createContext, FC, useContext, useState } from "react";
import { Tutorial as TutorialEntity } from "../../entities/tutorial.entity";
import { getPublishedTutorialsOrderedByPublishDate, getTutorialByTitleAsync, getTutorialsOrderedByModificationDate } from "../../services/tutorials/tutorialsService";
import { AuthContext } from "../auth/authContext";
import { AuthContextType } from "../auth/authContext.type";

type TutorialsContextPros = {
    children: React.ReactNode
}

export const TutorialsContext = createContext({});

export const TutorialsProvider: FC<TutorialsContextPros> = (children: TutorialsContextPros) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tutorialsOnHome, setTutorialsOnHome] = useState([] as TutorialEntity[]);
    const [openedTutorial, setOpenedTutorial] = useState<TutorialEntity>();
    const [tutorialsToEdit, setTutorialsToEdit] = useState<TutorialEntity[]>();
    const { currentUser } = useContext(AuthContext) as AuthContextType;

    const getTutorialsForHomePage = () => {
        setIsLoading(true);
        getPublishedTutorialsOrderedByPublishDate().then(response => {
            setIsLoading(false);
            setTutorialsOnHome(response.data as TutorialEntity[]);
        }, (error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const getTutorialByTitle = (title: string) => {
        setIsLoading(true);
        getTutorialByTitleAsync(title).then(response => {
            setOpenedTutorial(response);
            setIsLoading(false);
        }, (error) => {
            console.log(error);
            setIsLoading(false);
        })
    }

    const getTutorialsAsync = (pageNumber: number, pageSize: number) => {
        setIsLoading(true);
        getTutorialsOrderedByModificationDate(pageNumber, pageSize, currentUser.token).then(response => {
            setTutorialsToEdit(response);
            setIsLoading(false);
        }, (error) => {
            console.log(error);
            setIsLoading(false);
        })
    }


    return <TutorialsContext.Provider value={{
        isLoading,
        tutorialsOnHome, getTutorialsForHomePage,
        openedTutorial, getTutorialByTitle,
        getTutorialsAsync, tutorialsToEdit
    }} >
        {children.children}
    </TutorialsContext.Provider>
}

export default TutorialsProvider;