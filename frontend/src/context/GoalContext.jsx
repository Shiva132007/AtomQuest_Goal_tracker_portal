import { createContext, useState } from "react";

export const GoalContext = createContext();

function GoalProvider({ children }) {

  const [goals, setGoals] = useState([]);

  return (
    <GoalContext.Provider value={{ goals, setGoals }}>

      {children}

    </GoalContext.Provider>
  );
}

export default GoalProvider;