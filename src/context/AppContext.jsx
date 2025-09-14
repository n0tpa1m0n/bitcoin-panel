import React, { createContext, useState, useEffect, useContext } from "react";
import { GPU_MODELS } from "../data/gpuModels";

const AppContext = createContext();
export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const [blocks, setBlocks] = useState([
    {
      id: 1,
      name: "Блок #1 - RTX 3090 x6",
      gpuModel: "RTX 3090",
      gpuCount: 6,
      status: "online",
      hashrate: 120,
      image: null,
    },
    {
      id: 2,
      name: "Блок #2 - RX 6800 x8",
      gpuModel: "RX 6800",
      gpuCount: 8,
      status: "offline",
      hashrate: 0,
      image: null,
    },
  ]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkTheme(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      newTheme ? "dark" : "light"
    );
  };

  const addBlock = (newBlock) => {
    setBlocks((prevBlocks) => [...prevBlocks, { ...newBlock, id: Date.now() }]);
  };

  const updateBlock = (updatedBlock) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === updatedBlock.id ? updatedBlock : block
      )
    );
  };

  const deleteBlock = (id) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  const toggleBlockStatus = (id) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => {
        if (block.id === id) {
          const gpuModel = GPU_MODELS.find(
            (model) => model.name === block.gpuModel
          );
          const hashratePerCard = gpuModel ? gpuModel.hashrate : 0;

          return {
            ...block,
            status: block.status === "online" ? "offline" : "online",
            hashrate:
              block.status === "online" ? 0 : hashratePerCard * block.gpuCount,
          };
        }
        return block;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
        blocks,
        addBlock,
        deleteBlock,
        updateBlock,
        toggleBlockStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
