import { createContext, FC, useState } from "react";
import { Tutorial as TutorialEntity } from "../../entities/tutorial.entity";
import { getPublishedTutorialsOrderedByPublishDate, getTutorialByTitleAsync } from "../../services/tutorials/tutorialsService";

type TutorialsContextPros = {
    children: React.ReactNode
}

export const TutorialsContext = createContext({});

export const TutorialsProvider: FC<TutorialsContextPros> = (children: TutorialsContextPros) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tutorialsOnHome, setTutorialsOnHome] = useState([] as TutorialEntity[]);
    const [openedTutorial, setOpenedTutorial] = useState<TutorialEntity>();

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


    return <TutorialsContext.Provider value={{
        isLoading,
        tutorialsOnHome, getTutorialsForHomePage,
        openedTutorial, getTutorialByTitle
    }} >
        {children.children}
    </TutorialsContext.Provider>
}

export default TutorialsProvider;