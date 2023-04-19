import { createContext, FC, useState } from "react";

type FabContextProps = {
    children: React.ReactNode
}

export const FabContext = createContext({});

export const FabProvider: FC<FabContextProps> = (children: FabContextProps) => {
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    }

    const onOpen = () => {
        setOpen(true);
    }

    return <FabContext.Provider value={{
        open,
        onClose, onOpen
    }} >
        {children.children}
    </FabContext.Provider>
}

export default FabProvider;