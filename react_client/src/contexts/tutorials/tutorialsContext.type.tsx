import { Tutorial } from "../../entities/tutorial.entity";

export type TutorialsContextType = {
    isLoading: boolean;
    tutorialsOnHome: Tutorial[]
    getTutorialsForHomePage: () => void;
}