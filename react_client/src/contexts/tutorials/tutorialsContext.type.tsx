import { Tutorial as TutorialEntity } from "../../entities/tutorial.entity";

export type TutorialsContextType = {
    isLoading: boolean;

    tutorialsOnHome: TutorialEntity[]
    getTutorialsForHomePage: () => void;
    
    openedTutorial: TutorialEntity;
    getTutorialByTitle: (title: string) => void;
}