import { createContext, FC, useState } from "react";
import { Tutorial } from "../../entities/tutorial.entity";
import { getPublishedTutorialsOrderedByPublishDate } from "../../services/tutorials/tutorialsService";

type TutorialsContextPros = {
    children: React.ReactNode
}

export const TutorialsContext = createContext({});

export const TutorialsProvider: FC<TutorialsContextPros> = (children: TutorialsContextPros) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tutorialsOnHome, setTutorialsOnHome] = useState([] as Tutorial[]);

    const getTutorialsForHomePage = () => {
        setIsLoading(true);
        getPublishedTutorialsOrderedByPublishDate().then(response => {
            setIsLoading(false);
            setTutorialsOnHome(response.data as Tutorial[]);
        }, (error) => {
            console.log(error);
            setIsLoading(false);
        })
    }


    return <TutorialsContext.Provider value={{
        isLoading,
        tutorialsOnHome, getTutorialsForHomePage
    }} >
        {children.children}
    </TutorialsContext.Provider>
}

export default TutorialsProvider;